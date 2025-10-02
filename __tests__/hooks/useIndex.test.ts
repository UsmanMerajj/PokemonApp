import { renderHook } from "@testing-library/react-native";
import useIndex from "../../app/index/useIndex";
import { useGetPokemonsQuery } from "../../services/api";

jest.mock("../../services/api", () => ({
  useGetPokemonsQuery: jest.fn(),
}));

const mockUseGetPokemonsQuery = useGetPokemonsQuery as jest.MockedFunction<
  typeof useGetPokemonsQuery
>;

const mockApiResponse = {
  results: [
    {
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon/1/",
    },
    {
      name: "ivysaur",
      url: "https://pokeapi.co/api/v2/pokemon/2/",
    },
    {
      name: "venusaur",
      url: "https://pokeapi.co/api/v2/pokemon/3/",
    },
  ],
};

describe("useIndex", () => {
  beforeEach(() => {
    mockUseGetPokemonsQuery.mockReset();
  });

  it("returns loading state when API is loading", () => {
    mockUseGetPokemonsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    const { result } = renderHook(() => useIndex());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.pokemons).toBeUndefined();
  });

  it("returns error state when API fails", () => {
    mockUseGetPokemonsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);

    const { result } = renderHook(() => useIndex());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.pokemons).toBeUndefined();
  });

  it("transforms pokemon data correctly when API succeeds", () => {
    mockUseGetPokemonsQuery.mockReturnValue({
      data: mockApiResponse,
      isLoading: false,
      isError: false,
    } as any);

    const { result } = renderHook(() => useIndex());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.pokemons).toHaveLength(3);

    const firstPokemon = result.current.pokemons![0];
    expect(firstPokemon.id).toBe("1");
    expect(firstPokemon.name).toBe("bulbasaur");
    expect(firstPokemon.imageUrl).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    );

    const secondPokemon = result.current.pokemons![1];
    expect(secondPokemon.id).toBe("2");
    expect(secondPokemon.name).toBe("ivysaur");
  });

  it("handles URLs without trailing slash", () => {
    const responseWithoutSlash = {
      results: [
        {
          name: "pikachu",
          url: "https://pokeapi.co/api/v2/pokemon/25",
        },
      ],
    };

    mockUseGetPokemonsQuery.mockReturnValue({
      data: responseWithoutSlash,
      isLoading: false,
      isError: false,
    } as any);

    const { result } = renderHook(() => useIndex());

    const pokemon = result.current.pokemons![0];
    expect(pokemon.id).toBe("25");
    expect(pokemon.name).toBe("pikachu");
  });

  it("handles empty results", () => {
    mockUseGetPokemonsQuery.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      isError: false,
    } as any);

    const { result } = renderHook(() => useIndex());

    expect(result.current.pokemons).toHaveLength(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
