import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.EXPO_PUBLIC_API_URI }),
  cache: new InMemoryCache(),
})