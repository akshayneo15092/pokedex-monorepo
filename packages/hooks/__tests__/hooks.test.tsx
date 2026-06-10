import { renderHook, act } from "@testing-library/react";
import { usePokemonDetail } from "../src/usePokemonDetail";
import { usePokemonList } from "../src/usePokemonList";
import { fetchPokemon, fetchPokemonList } from "@pockeman/utils";

// Mock the utils module
jest.mock("@pockeman/utils", () => ({
  fetchPokemon: jest.fn(),
  fetchPokemonList: jest.fn(),
}));

const mockFetchPokemon = fetchPokemon as jest.Mock;
const mockFetchPokemonList = fetchPokemonList as jest.Mock;

describe("usePokemonDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should start with loading = true and pokemon = null", async () => {
    let resolvePromise: (value: any) => void = () => {};
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockFetchPokemon.mockReturnValue(promise);

    const { result } = renderHook(() => usePokemonDetail("bulbasaur"));

    expect(result.current.loading).toBe(true);
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBeNull();

    // Resolve the promise to clean up
    await act(async () => {
      resolvePromise({});
    });
  });

  it("should set pokemon and loading = false on success", async () => {
    const mockData = { id: 1, name: "bulbasaur" };
    mockFetchPokemon.mockResolvedValue(mockData);

    const { result } = renderHook(() => usePokemonDetail("bulbasaur"));

    await act(async () => {
      await Promise.resolve(); // wait for fetchPokemon promise to resolve
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.pokemon).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it("should set error and loading = false on failure", async () => {
    mockFetchPokemon.mockRejectedValue(new Error("Failed"));

    const { result } = renderHook(() => usePokemonDetail("unknown"));

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.pokemon).toBeNull();
    expect(result.current.error).toBe("Failed to load Pokémon details.");
  });

  it("should not state update if unmounted before fetch resolves", async () => {
    let resolvePromise: (value: any) => void = () => {};
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockFetchPokemon.mockReturnValue(promise);

    const { unmount } = renderHook(() => usePokemonDetail("bulbasaur"));

    unmount();

    await act(async () => {
      resolvePromise({ id: 1, name: "bulbasaur" });
    });
  });

  it("should not state update if unmounted before fetch rejects", async () => {
    let rejectPromise: (reason: any) => void = () => {};
    const promise = new Promise((_, reject) => {
      rejectPromise = reject;
    });
    mockFetchPokemon.mockReturnValue(promise);

    const { unmount } = renderHook(() => usePokemonDetail("bulbasaur"));

    unmount();

    await act(async () => {
      rejectPromise(new Error("Failed"));
    });
  });
});

describe("usePokemonList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch initial pokemon list on mount", async () => {
    const mockList = [
      { id: 1, name: "bulbasaur", imageUrl: "url" },
    ];
    mockFetchPokemonList.mockResolvedValue(mockList);

    const { result } = renderHook(() => usePokemonList());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(mockList);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false); // since list length (1) is less than page size (20)
  });

  it("should handle error on initial fetch", async () => {
    mockFetchPokemonList.mockRejectedValue(new Error("Fetch failed"));

    const { result } = renderHook(() => usePokemonList());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual([]);
    expect(result.current.error).toBe("Failed to load Pokémon. Please try again.");
  });

  it("should paginate correctly with loadMore", async () => {
    // Return a full page (20 items) initially to allow loadMore
    const mockList1 = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      imageUrl: "url",
    }));
    const mockList2 = [
      { id: 21, name: "pokemon-21", imageUrl: "url" },
    ];

    mockFetchPokemonList
      .mockResolvedValueOnce(mockList1)
      .mockResolvedValueOnce(mockList2);

    const { result } = renderHook(() => usePokemonList());

    // Wait for initial load
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.items).toHaveLength(20);
    expect(result.current.hasMore).toBe(true);

    // Call loadMore
    act(() => {
      result.current.loadMore();
    });

    // Wait for second load
    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.items).toHaveLength(21);
    expect(result.current.hasMore).toBe(false); // second list is length 1 (less than 20)
  });

  it("should not load more if loading is true or hasMore is false", async () => {
    const mockList = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `pokemon-${i + 1}`,
      imageUrl: "url",
    }));
    mockFetchPokemonList.mockResolvedValue(mockList);

    const { result } = renderHook(() => usePokemonList());

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.hasMore).toBe(true);

    // Call loadMore but make fetchPokemonList return a pending promise
    let resolveSecondPromise: (value: any) => void = () => {};
    const secondPromise = new Promise((resolve) => {
      resolveSecondPromise = resolve;
    });
    mockFetchPokemonList.mockReturnValue(secondPromise);

    act(() => {
      result.current.loadMore();
    });
    expect(result.current.loading).toBe(true);

    // Call loadMore again while loading is true (should be ignored)
    act(() => {
      result.current.loadMore();
    });

    await act(async () => {
      resolveSecondPromise([]);
    });

    // After resolving with an empty list, hasMore becomes false
    expect(result.current.hasMore).toBe(false);

    // Call loadMore when hasMore is false (should be ignored)
    act(() => {
      result.current.loadMore();
    });

    // Verify fetchPokemonList was called exactly twice (once on mount, once for first loadMore)
    expect(mockFetchPokemonList).toHaveBeenCalledTimes(2);
  });
});
