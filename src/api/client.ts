import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URI }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ["filter"],
            merge(existing, incoming) {
              if (!existing) return incoming;
              return {
                ...incoming,
                results: [...existing.results, ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
})