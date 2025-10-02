import { renderHook } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemon from "../../app/pokemon/usePokemon";
import { useGetPokemonByIdQuery } from "../../services/api";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock("../../services/api", () => ({
  useGetPokemonByIdQuery: jest.fn(),
}));

const mockUseLocalSearchParams = useLocalSearchParams as jest.MockedFunction<
  typeof useLocalSearchParams
>;
const mockUseGetPokemonByIdQuery =
  useGetPokemonByIdQuery as jest.MockedFunction<typeof useGetPokemonByIdQuery>;

const mockPokemonData = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  types: [
    {
      type: {
        name: "grass",
      },
    },
  ],
};

describe("usePokemon", () => {
  beforeEach(() => {
    mockUseLocalSearchParams.mockReset();
    mockUseGetPokemonByIdQuery.mockReset();
  });

  it("calls API with correct ID from route params", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "25" });
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    renderHook(() => usePokemon());

    expect(mockUseGetPokemonByIdQuery).toHaveBeenCalledWith("25");
  });

  it("returns loading state when API is loading", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "1" });
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    const { result } = renderHook(() => usePokemon());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.pokemon).toBeUndefined();
  });

  it("returns error state when API fails", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "1" });
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    } as any);

    const { result } = renderHook(() => usePokemon());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
    expect(result.current.pokemon).toBeUndefined();
  });

  it("returns pokemon data when API succeeds", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "1" });
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      isError: false,
    } as any);

    const { result } = renderHook(() => usePokemon());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.pokemon).toEqual(mockPokemonData);
  });

  it("handles missing ID parameter", () => {
    mockUseLocalSearchParams.mockReturnValue({});
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    } as any);

    renderHook(() => usePokemon());

    expect(mockUseGetPokemonByIdQuery).toHaveBeenCalledWith(undefined);
  });

  it("handles string ID parameter", () => {
    mockUseLocalSearchParams.mockReturnValue({ id: "42" });
    mockUseGetPokemonByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    renderHook(() => usePokemon());

    expect(mockUseGetPokemonByIdQuery).toHaveBeenCalledWith("42");
  });
});
