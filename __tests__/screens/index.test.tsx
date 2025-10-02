import { fireEvent, render, screen } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import React from "react";
import HomeScreen from "../../app/index";
import useIndex from "../../app/index/useIndex";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../app/index/useIndex");

jest.mock("../../app/index/components/PokemonCard", () => {
  const mockReact = require("react");
  const mockRN = require("react-native");

  return function MockPokemonCard({ item, onPress }: any) {
    return mockReact.createElement(
      mockRN.TouchableOpacity,
      {
        onPress,
        testID: `pokemon-card-${item.id}`,
      },
      mockReact.createElement(mockRN.Text, null, item.name)
    );
  };
});

const mockPush = jest.fn();
const mockUseIndex = useIndex as jest.MockedFunction<typeof useIndex>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("HomeScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush } as any);
  });

  it("renders loading state", () => {
    mockUseIndex.mockReturnValue({
      pokemons: undefined,
      isLoading: true,
      isError: false,
    });

    render(<HomeScreen />);

    expect(screen.getByText("Loading Pokemon...")).toBeTruthy();
    expect(screen.getByTestId("activity-indicator")).toBeTruthy();
  });

  it("renders pokemon list after loading", () => {
    const mockPokemons = [
      { id: "1", name: "bulbasaur", imageUrl: "https://example.com/1.png" },
      { id: "2", name: "ivysaur", imageUrl: "https://example.com/2.png" },
    ];

    mockUseIndex.mockReturnValue({
      pokemons: mockPokemons,
      isLoading: false,
      isError: false,
    });

    render(<HomeScreen />);

    expect(screen.getByText("bulbasaur")).toBeTruthy();
    expect(screen.getByText("ivysaur")).toBeTruthy();
  });

  it("handles pokemon selection and navigates to detail", () => {
    const mockPokemons = [
      { id: "1", name: "bulbasaur", imageUrl: "https://example.com/1.png" },
    ];

    mockUseIndex.mockReturnValue({
      pokemons: mockPokemons,
      isLoading: false,
      isError: false,
    });

    render(<HomeScreen />);

    const bulbasaurCard = screen.getByTestId("pokemon-card-1");
    fireEvent.press(bulbasaurCard);

    expect(mockPush).toHaveBeenCalledWith("/pokemon/1");
  });

  it("renders error state when there is an error", () => {
    mockUseIndex.mockReturnValue({
      pokemons: undefined,
      isLoading: false,
      isError: true,
    });

    render(<HomeScreen />);

    expect(screen.getByText("Error fetching Pokemon")).toBeTruthy();
  });

  it("renders empty list when no pokemon are available", () => {
    mockUseIndex.mockReturnValue({
      pokemons: [],
      isLoading: false,
      isError: false,
    });

    render(<HomeScreen />);

    expect(screen.queryByText("Loading Pokemon...")).toBeFalsy();
    expect(screen.queryByText("Error fetching Pokemon")).toBeFalsy();
  });
});
