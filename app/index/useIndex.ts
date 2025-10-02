import { useGetPokemonsQuery } from "../../services/api";

const useIndex = () => {
  const { data, isLoading, isError } = useGetPokemonsQuery();

  const pokemons = data?.results.map((item) => {
    const id = item.url.split("/").filter(Boolean).pop();
    return {
      id,
      name: item.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  return {
    pokemons,
    isLoading,
    isError,
  };
};

export default useIndex;
