import { ApolloError } from '@apollo/client';

export function extractStatusCode(error: unknown): number | null {
  if (!(error instanceof ApolloError)) return null;
  const serverError = error.networkError as { statusCode?: number } | null;
  return serverError?.statusCode ?? null;
}
