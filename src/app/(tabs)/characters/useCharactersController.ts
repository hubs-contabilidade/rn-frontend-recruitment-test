import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../../../api/queries";
import type { CharactersData, CharactersVars } from "../../../types/character";

export type StatusFilter = "All" | "Alive" | "Dead" | "unknown";

export function useCharactersController() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");

  const filter = {
    ...(search ? { name: search } : {}),
    ...(status !== "All" ? { status } : {}),
  };

  const { data, loading, error, fetchMore, networkStatus, refetch } = useQuery<
    CharactersData,
    CharactersVars
  >(GET_CHARACTERS, {
    variables: { page: 1, filter },
    notifyOnNetworkStatusChange: true,
  });

  const characters = data?.characters.results ?? [];
  const info = data?.characters.info;

  const handleLoadMore = useCallback(() => {
    if (info?.next && networkStatus !== 3) {
      fetchMore({ variables: { page: info.next, filter } });
    }
  }, [info?.next, networkStatus, fetchMore, filter]);

  const handleSearch = useCallback(
    (text: string) => {
      setSearch(text);
      refetch({
        page: 1,
        filter: {
          ...(text ? { name: text } : {}),
          ...(status !== "All" ? { status } : {}),
        },
      });
    },
    [refetch, status],
  );

  const handleStatusChange = useCallback(
    (newStatus: StatusFilter) => {
      setStatus(newStatus);
      refetch({
        page: 1,
        filter: {
          ...(search ? { name: search } : {}),
          ...(newStatus !== "All" ? { status: newStatus } : {}),
        },
      });
    },
    [refetch, search],
  );

  const handleCharacterPress = useCallback(
    (id: string) => {
      router.push(`/character/${id}`);
    },
    [router],
  );

  return {
    characters,
    info,
    loading,
    error,
    networkStatus,
    search,
    status,
    handleLoadMore,
    handleSearch,
    handleStatusChange,
    handleCharacterPress,
    refetch,
  };
}
