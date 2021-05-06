import { createHash } from "crypto";

import { AppOptions } from "next-auth/internals";

import { Account, Session, User, VerificationRequest } from "modules/api/models";
import { initializeDatabase } from "modules/database";

export const AuthAdapter = () => {
  return {
    getAdapter: async ({ session: { maxAge, updateAge }, secret, ...appOptions }: AppOptions) => {
      const sessionMaxAge = maxAge * 1000;
      const sessionUpdateAge = updateAge * 1000;

      const hashToken = (token) => createHash("sha256").update(`${token}${secret}`).digest("hex");

      return {
        async createUser(profile: any) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(User);

          const user = new User();
          user.name = profile.name;
          user.email = profile.email;
          user.image = profile.image;
          if (profile.emailVerified) user.emailVerifiedOn = new Date();

          return repository.save(user);
        },
        async getUser(id) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(User);

          return repository.findOne(id);
        },
        async getUserByEmail(email) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(User);

          return repository.findOne({ where: { email } });
        },
        async getUserByProviderAccountId(providerId, providerAccountId) {
          const connection = await initializeDatabase();
          const accountRepository = connection.getRepository(Account);
          const userRepository = connection.getRepository(User);

          const account = await accountRepository.findOne({
            where: { providerId, providerAccountId },
            relations: ["user"]
          });

          if (account) {
            return await userRepository.findOne(account.user.id);
          }

          return null;
        },
        async updateUser(user) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(User);

          return repository.save(user);
        },
        async deleteUser(userId) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(User);

          return repository.delete({ id: userId });
        },
        async linkAccount(
          userId,
          providerId,
          providerType,
          providerAccountId,
          refreshToken,
          accessToken,
          accessTokenExpiresOn
        ) {
          const connection = await initializeDatabase();
          const accountRepository = connection.getRepository(Account);
          const userRepository = connection.getRepository(User);

          const account = new Account();
          account.user = await userRepository.findOne(userId);
          account.providerId = providerId;
          account.providerType = providerType;
          account.providerAccountId = providerAccountId;
          account.refreshToken = refreshToken;
          account.accessToken = accessToken;
          account.accessTokenExpiresOn = accessTokenExpiresOn;

          return accountRepository.save(account);
        },
        async unlinkAccount(userId, providerId, providerAccountId) {
          const connection = await initializeDatabase();
          const accountRepository = connection.getRepository(Account);
          const userRepository = connection.getRepository(User);

          const user = await userRepository.findOne(userId);
          accountRepository.delete({ user, providerId, providerAccountId });
        },
        async createSession(user: User) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(Session);

          let expiresOn = null;

          if (sessionMaxAge) {
            const dateExpires = new Date();
            dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
            expiresOn = dateExpires;
          }

          await repository.delete({ user });

          const session = new Session();
          session.user = user;
          session.expiresOn = expiresOn;

          return repository.save(session);
        },
        async getSession(sessionToken) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(Session);

          const session = await repository.findOne({ where: { sessionToken } });

          if (new Date() > session.expiresOn) {
            // TODO : Delete old sessions from database
            return null;
          }

          return session;
        },
        async updateSession(session: Session, force) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(Session);

          if (sessionMaxAge && (sessionUpdateAge || sessionUpdateAge === 0) && session.expiresOn) {
            // Calculate last updated date, to throttle write updates to database
            // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
            //     e.g. ({expiry date} - 30 days) + 1 hour
            //
            // Default for sessionMaxAge is 30 days.
            // Default for sessionUpdateAge is 1 hour.

            const dateSessionIsDueToBeUpdated = new Date(session.expiresOn);
            dateSessionIsDueToBeUpdated.setTime(
              dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge
            );
            dateSessionIsDueToBeUpdated.setTime(
              dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge
            );

            // Trigger update of session expiry date and write to database, only
            // if the session was last updated more than {sessionUpdateAge} ago
            if (new Date() > dateSessionIsDueToBeUpdated) {
              const newExpiryDate = new Date();
              newExpiryDate.setTime(newExpiryDate.getTime() + sessionMaxAge);
              session.expiresOn = newExpiryDate;
            } else if (!force) {
              return null;
            }
          } else {
            // If session MaxAge, session UpdateAge or session.expires are
            // missing then don't even try to save changes, unless force is set.
            if (!force) {
              return null;
            }
          }

          return repository.save(session);
        },
        async deleteSession(sessionToken) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(Session);

          return repository.delete({ sessionToken });
        },
        async createVerificationRequest(identifier, url, token, _, provider) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(VerificationRequest);

          const { sendVerificationRequest, maxAge } = provider;

          const hashedToken = hashToken(token);

          let expiresOn = null;
          if (maxAge) {
            const dateExpires = new Date();
            dateExpires.setTime(dateExpires.getTime() + maxAge * 1000);
            expiresOn = dateExpires;
          }

          const verificationRequest = new VerificationRequest();
          verificationRequest.identifier = identifier;
          verificationRequest.token = hashedToken;
          verificationRequest.expiresOn = expiresOn;

          await repository.save(verificationRequest);

          // With the verificationCallback on a provider, you can send an email, or queue
          // an email to be sent, or perform some other action (e.g. send a text message)
          await sendVerificationRequest({
            identifier,
            url,
            token,
            baseUrl: appOptions.baseUrl,
            provider
          });
        },
        async getVerificationRequest(identifier, token) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(VerificationRequest);

          const hashedToken = hashToken(token);
          const verificationRequest = await repository.findOne({
            where: {
              identifier,
              token: hashedToken
            }
          });

          if (new Date() > verificationRequest.expiresOn) {
            // Delete verification entry so it cannot be used again
            await repository.delete({ token: hashedToken });
            return null;
          }

          return verificationRequest;
        },
        async deleteVerificationRequest(identifier, token) {
          const connection = await initializeDatabase();
          const repository = connection.getRepository(VerificationRequest);

          const hashedToken = hashToken(token);
          await repository.delete({
            identifier,
            token: hashedToken
          });
        }
      };
    }
  };
};
