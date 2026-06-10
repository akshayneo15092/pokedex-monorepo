import {
  extractIdFromUrl,
  getOfficialArtworkUrl,
  mapListItemsToPokemon,
  fetchPokemonList,
  fetchPokemon,
  formatStatName,
  formatHeight,
  formatWeight,
} from "../src/index";

describe("Utils package tests", () => {
  describe("extractIdFromUrl", () => {
    it("should extract ID from valid URLs", () => {
      expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/1/")).toBe(1);
      expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/150")).toBe(150);
      expect(extractIdFromUrl("https://pokeapi.co/api/v2/pokemon/9999/")).toBe(9999);
    });

    it("should handle single parts if no slashes are present", () => {
      expect(extractIdFromUrl("123")).toBe(123);
    });
  });

  describe("getOfficialArtworkUrl", () => {
    it("should construct correct artwork URL", () => {
      expect(getOfficialArtworkUrl(1)).toBe(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
      );
      expect(getOfficialArtworkUrl(25)).toBe(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      );
    });
  });

  describe("mapListItemsToPokemon", () => {
    it("should correctly map NamedResource array to PokemonListItem array", () => {
      const results = [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
      ];
      const expected = [
        {
          id: 1,
          name: "bulbasaur",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
        {
          id: 4,
          name: "charmander",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        },
      ];
      expect(mapListItemsToPokemon(results)).toEqual(expected);
    });
  });

  describe("formatStatName", () => {
    it("should map common stats to user-friendly labels", () => {
      expect(formatStatName("hp")).toBe("HP");
      expect(formatStatName("attack")).toBe("Attack");
      expect(formatStatName("defense")).toBe("Defense");
      expect(formatStatName("special-attack")).toBe("Sp. Atk");
      expect(formatStatName("special-defense")).toBe("Sp. Def");
      expect(formatStatName("speed")).toBe("Speed");
    });

    it("should return the original name if not in the map", () => {
      expect(formatStatName("accuracy")).toBe("accuracy");
      expect(formatStatName("evasion")).toBe("evasion");
    });
  });

  describe("formatHeight", () => {
    it("should format decimeters to meters string", () => {
      expect(formatHeight(7)).toBe("0.7 m");
      expect(formatHeight(10)).toBe("1.0 m");
      expect(formatHeight(20)).toBe("2.0 m");
    });
  });

  describe("formatWeight", () => {
    it("should format hectograms to kilograms string", () => {
      expect(formatWeight(69)).toBe("6.9 kg");
      expect(formatWeight(100)).toBe("10.0 kg");
      expect(formatWeight(2000)).toBe("200.0 kg");
    });
  });

  describe("fetchPokemonList & fetchPokemon (API calls)", () => {
    let originalFetch: typeof global.fetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn();
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it("fetchPokemonList should fetch list and map items", async () => {
      const mockListResponse = {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockListResponse,
      });

      const result = await fetchPokemonList(1, 0);
      expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon?limit=1&offset=0");
      expect(result).toEqual([
        {
          id: 1,
          name: "bulbasaur",
          imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        },
      ]);
    });

    it("fetchPokemonList should throw error on failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      await expect(fetchPokemonList(20, 0)).rejects.toThrow("Failed to fetch pokemon list");
    });

    it("fetchPokemonList should use default limit and offset values when not provided", async () => {
      const mockListResponse = {
        results: [],
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockListResponse,
      });

      await fetchPokemonList();
      expect(global.fetch).toHaveBeenLastCalledWith("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");

      await fetchPokemonList(10);
      expect(global.fetch).toHaveBeenLastCalledWith("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");

      await fetchPokemonList(undefined, 5);
      expect(global.fetch).toHaveBeenLastCalledWith("https://pokeapi.co/api/v2/pokemon?limit=20&offset=5");
    });


    it("fetchPokemon should fetch single pokemon data", async () => {
      const mockPokeData = {
        id: 1,
        name: "bulbasaur",
        height: 7,
        weight: 69,
      };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockPokeData,
      });

      const result = await fetchPokemon(1);
      expect(global.fetch).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/1");
      expect(result).toEqual(mockPokeData);
    });

    it("fetchPokemon should throw error on failure", async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
      });

      await expect(fetchPokemon("nonexistent")).rejects.toThrow("Failed to fetch pokemon: nonexistent");
    });
  });
});
