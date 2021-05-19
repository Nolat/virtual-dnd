import { InMemoryCache } from "@apollo/client";

import { TypedTypePolicies } from "../graphql/generated";

const typePolicies: TypedTypePolicies = {
  Query: {}
};

const cache = new InMemoryCache({
  typePolicies
});

export default cache;
