import { api } from "../../services/api";

describe("api service", () => {
  it("should have correct reducer path", () => {
    expect(api.reducerPath).toBe("api");
  });

  it("should have getPokemons endpoint", () => {
    expect(api.endpoints.getPokemons).toBeDefined();
  });

  it("should have getPokemonById endpoint", () => {
    expect(api.endpoints.getPokemonById).toBeDefined();
  });

  it("should export the generated hooks", () => {
    const {
      useGetPokemonsQuery,
      useGetPokemonByIdQuery,
    } = require("../../services/api");
    expect(useGetPokemonsQuery).toBeDefined();
    expect(useGetPokemonByIdQuery).toBeDefined();
  });
});
