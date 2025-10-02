import React from "react";
import PokemonDetail from "../../app/pokemon/[id]";
import usePokemon from "../../app/pokemon/usePokemon";
import { render, screen } from "../../utils/test-utils";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ id: "1" })),
  Stack: {
    Screen: ({ children, options }: any) => children,
  },
}));

jest.mock("../../utils/string", () => ({
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
}));

jest.mock("../../app/pokemon/usePokemon");

const mockUsePokemon = usePokemon as jest.MockedFunction<typeof usePokemon>;

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
    {
      type: {
        name: "poison",
      },
    },
  ],
};

describe("PokemonDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    mockUsePokemon.mockReturnValue({
      pokemon: undefined,
      isLoading: true,
      isError: false,
    });

    render(<PokemonDetail />);

    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  it("renders error state", () => {
    mockUsePokemon.mockReturnValue({
      pokemon: undefined,
      isLoading: false,
      isError: true,
    });

    render(<PokemonDetail />);

    expect(screen.getByText("Failed to load")).toBeTruthy();
  });

  it("renders pokemon details", () => {
    mockUsePokemon.mockReturnValue({
      pokemon: mockPokemonData,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    expect(screen.getByText("bulbasaur")).toBeTruthy();
    expect(screen.getByText("7")).toBeTruthy();
    expect(screen.getByText("69")).toBeTruthy();

    expect(screen.getByText("grass")).toBeTruthy();
    expect(screen.getByText("poison")).toBeTruthy();

    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Height")).toBeTruthy();
    expect(screen.getByText("Weight")).toBeTruthy();
    expect(screen.getByText("Types")).toBeTruthy();
  });

  it("renders pokemon with image", () => {
    mockUsePokemon.mockReturnValue({
      pokemon: mockPokemonData,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    const image = screen.getByTestId("pokemon-image");
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(mockPokemonData.sprites.front_default);
  });

  it("handles pokemon with single type", () => {
    const singleTypePokemon = {
      ...mockPokemonData,
      types: [
        {
          type: {
            name: "electric",
          },
        },
      ],
    };

    mockUsePokemon.mockReturnValue({
      pokemon: singleTypePokemon,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    expect(screen.getByText("electric")).toBeTruthy();
    expect(screen.queryByText("grass")).toBeFalsy();
    expect(screen.queryByText("poison")).toBeFalsy();
  });

  it("handles pokemon with no types", () => {
    const noTypePokemon = {
      ...mockPokemonData,
      types: [],
    };

    mockUsePokemon.mockReturnValue({
      pokemon: noTypePokemon,
      isLoading: false,
      isError: false,
    });

    render(<PokemonDetail />);

    expect(screen.getByText("Types")).toBeTruthy();
    expect(screen.queryByText("grass")).toBeFalsy();
    expect(screen.queryByText("poison")).toBeFalsy();
  });
});
