import { InMemoryCache } from "@apollo/client";

import { TypedTypePolicies } from "../graphql/generated";

// export const messagesVar = makeVar<MessageFieldsFragment[]>([]);

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      Game: {
        merge(_, incoming) {
          return incoming;
        }
      }
      // GetMessages: {
      //   read() {
      //     return messagesVar();
      //   }
      // }
    }
  },
  Subscription: {
    fields: {
      onlinePlayersChanged: {
        merge(_, incoming) {
          return incoming;
        }
      }
    }
  }
};

const cache = new InMemoryCache({
  typePolicies
});

export default cache;
