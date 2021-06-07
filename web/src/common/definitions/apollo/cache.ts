import { InMemoryCache } from "@apollo/client";

import fragmentMatcher from "../graphql/fragment-matcher";
import { TypedTypePolicies } from "../graphql/generated";

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      Game: {
        merge(_, incoming) {
          return incoming;
        }
      }
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
  typePolicies,
  possibleTypes: fragmentMatcher.possibleTypes
});

export default cache;
