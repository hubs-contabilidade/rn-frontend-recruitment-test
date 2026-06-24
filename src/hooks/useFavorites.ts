import { GET_CHARACTERS_BY_IDS } from '../api/queries';
import type { CharactersByIdsData, CharactersByIdsVars } from '../types/character';
import { useQuery } from '@apollo/client';

export function useFavorites(ids: string[]) {
  const { data, loading, error, refetch } = useQuery<CharactersByIdsData, CharactersByIdsVars>(
    GET_CHARACTERS_BY_IDS,
    { variables: { ids }, skip: ids.length === 0 },
  );

  return { data, loading, error, refetch };
}
