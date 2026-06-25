import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ['filter'],
          merge(existing, incoming, { args }) {
            if (!existing || args?.page === 1) return incoming;
            return {
              ...incoming,
              results: [...existing.results, ...incoming.results],
            };
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URI }),
  cache,
})