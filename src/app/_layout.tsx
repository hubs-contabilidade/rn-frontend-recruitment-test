import { client } from "@/api/client";
import { ApolloProvider } from "@apollo/client/react";
import { Stack } from "expo-router";
// import { useApolloClientDevTools } from "@dev-plugins/apollo-client";


export default function RootLayout() {
  // useApolloClientDevTools(client);
  return(
     <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
