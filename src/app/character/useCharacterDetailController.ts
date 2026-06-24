import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../../api/queries";
import type { CharacterData, CharacterVars } from "../../types/character";
import { useFavoritesStore } from "../../store/useFavoritesStore";

export function useCharacterDetailController() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { has, toggle } = useFavoritesStore();

  const { data, loading, error, refetch } = useQuery<CharacterData, CharacterVars>(
    GET_CHARACTER,
    { variables: { id: id! } },
  );

  return {
    character: data?.character ?? null,
    loading,
    error,
    refetch,
    isFavorite: has(id!),
    toggleFavorite: () => toggle(id!),
  };
}
