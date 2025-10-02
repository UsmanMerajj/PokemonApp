import { useLocalSearchParams } from "expo-router";
import { useGetPokemonByIdQuery } from "../../services/api";

const usePokemon = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useGetPokemonByIdQuery(id!);

  return {
    pokemon: data,
    isLoading,
    isError,
  };
};

export default usePokemon;
