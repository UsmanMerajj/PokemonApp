import React from "react";
import PokemonCard from "../../app/index/components/PokemonCard";
import { fireEvent, render, screen } from "../../utils/test-utils";

const mockPokemon = {
  id: "1",
  name: "bulbasaur",
  imageUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
};

describe("PokemonCard", () => {
  it("renders pokemon name", () => {
    const onPress = jest.fn();

    render(<PokemonCard item={mockPokemon} onPress={onPress} />);

    expect(screen.getByText("bulbasaur")).toBeTruthy();
  });

  it("renders pokemon image with correct source", () => {
    const onPress = jest.fn();

    render(<PokemonCard item={mockPokemon} onPress={onPress} />);

    const image = screen.getByTestId("pokemon-card-image");
    expect(image.props.source.uri).toBe(mockPokemon.imageUrl);
  });

  it("calls onPress when card is pressed", () => {
    const onPress = jest.fn();

    render(<PokemonCard item={mockPokemon} onPress={onPress} />);

    const card = screen.getByText("bulbasaur").parent;
    if (card) {
      fireEvent.press(card);
    }

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("renders with different pokemon data", () => {
    const differentPokemon = {
      id: "25",
      name: "pikachu",
      imageUrl:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    };
    const onPress = jest.fn();

    render(<PokemonCard item={differentPokemon} onPress={onPress} />);

    expect(screen.getByText("pikachu")).toBeTruthy();

    const image = screen.getByTestId("pokemon-card-image");
    expect(image.props.source.uri).toBe(differentPokemon.imageUrl);
  });

  it("has correct accessibility properties", () => {
    const onPress = jest.fn();

    render(<PokemonCard item={mockPokemon} onPress={onPress} />);

    const pokemonText = screen.getByText("bulbasaur");
    const touchableOpacity = pokemonText.parent;

    expect(touchableOpacity).toBeTruthy();
    if (touchableOpacity) {
      expect(touchableOpacity.props.accessible).toBe(true);
    }
  });
});
