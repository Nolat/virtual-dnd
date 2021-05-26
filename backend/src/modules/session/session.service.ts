import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Session } from "models";
import { UserService } from "modules/user/user.service";

import { CreateSessionInput, UpdateSessionInput } from "./session.input";

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}

  findById(id: string) {
    return this.sessionRepository.findOneOrFail({ where: { id } });
  }

  findByToken(token: string) {
    return this.sessionRepository.findOneOrFail({ where: { sessionToken: token } });
  }

  async create({ userId, sessionMaxAge }: CreateSessionInput) {
    let expiresOn = null;

    const user = await this.userService.findById(userId);

    if (sessionMaxAge) {
      const dateExpires = new Date();
      dateExpires.setTime(dateExpires.getTime() + sessionMaxAge);
      expiresOn = dateExpires;
    }

    await this.sessionRepository.delete({ user });

    const session = new Session();
    session.user = user;
    session.expiresOn = expiresOn;

    return this.sessionRepository.save(session);
  }

  async update({ force, sessionId, sessionMaxAge, sessionUpdateAge }: UpdateSessionInput) {
    const session = await this.findById(sessionId);

    if (sessionMaxAge && (sessionUpdateAge || sessionUpdateAge === 0) && session.expiresOn) {
      // Calculate last updated date, to throttle write updates to database
      // Formula: ({expiry date} - sessionMaxAge) + sessionUpdateAge
      //     e.g. ({expiry date} - 30 days) + 1 hour
      //
      // Default for sessionMaxAge is 30 days.
      // Default for sessionUpdateAge is 1 hour.

      const dateSessionIsDueToBeUpdated = new Date(session.expiresOn);
      dateSessionIsDueToBeUpdated.setTime(dateSessionIsDueToBeUpdated.getTime() - sessionMaxAge);
      dateSessionIsDueToBeUpdated.setTime(dateSessionIsDueToBeUpdated.getTime() + sessionUpdateAge);

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

    return this.sessionRepository.save(session);
  }

  async delete(token: string) {
    await this.sessionRepository.delete({ sessionToken: token });
    return true;
  }
}
