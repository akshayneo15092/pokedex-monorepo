import "@testing-library/jest-dom";
import React from "react";

import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";
import PokemonDetailPage from "../app/pokeman/[name]/page";
import { usePokemonList, usePokemonDetail } from "@pockeman/hooks";
import { mockPush, mockBack } from "../__mocks__/next-navigation";

// Mock window.location at the file level
const mockReload = jest.fn();
delete (window as any).location;
window.location = { reload: mockReload } as any;

// Cast mocked hooks
const mockUsePokemonList = usePokemonList as jest.Mock;
const mockUsePokemonDetail = usePokemonDetail as jest.Mock;

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReload.mockClear();
  });

  it("renders headers and search input", () => {
    mockUsePokemonList.mockReturnValue({
      items: [],
      loading: false,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    
    expect(screen.getByTestId("page-header")).toHaveTextContent("Pokédex");
    expect(screen.getByPlaceholderText("Search Pokémon...")).toBeInTheDocument();
  });

  it("renders PokemonListCards for each item", () => {
    const mockItems = [
      { id: 1, name: "bulbasaur", imageUrl: "url1" },
      { id: 4, name: "charmander", imageUrl: "url2" },
    ];
    mockUsePokemonList.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    
    const cards = screen.getAllByTestId("pokemon-list-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("bulbasaur");
    expect(cards[1]).toHaveTextContent("charmander");
  });

  it("filters items based on search query", () => {
    const mockItems = [
      { id: 1, name: "bulbasaur", imageUrl: "url1" },
      { id: 4, name: "charmander", imageUrl: "url2" },
    ];
    mockUsePokemonList.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    
    const searchInput = screen.getByPlaceholderText("Search Pokémon...");
    fireEvent.change(searchInput, { target: { value: "bulb" } });

    const cards = screen.getAllByTestId("pokemon-list-card");
    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveTextContent("bulbasaur");
  });

  it("navigates to details page when card is clicked", () => {
    const mockItems = [{ id: 1, name: "bulbasaur", imageUrl: "url1" }];
    mockUsePokemonList.mockReturnValue({
      items: mockItems,
      loading: false,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    
    const card = screen.getByTestId("pokemon-list-card");
    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith("/pokeman/bulbasaur");
  });

  it("shows loader when loading is true", () => {
    mockUsePokemonList.mockReturnValue({
      items: [],
      loading: true,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

 

  it("shows empty state when search finds no matches", () => {
    mockUsePokemonList.mockReturnValue({
      items: [{ id: 1, name: "bulbasaur", imageUrl: "url1" }],
      loading: false,
      error: null,
      hasMore: false,
      loadMore: jest.fn(),
    });

    render(<Home />);
    const searchInput = screen.getByPlaceholderText("Search Pokémon...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("shows Load More button and triggers loadMore when clicked", () => {
    const loadMoreMock = jest.fn();
    mockUsePokemonList.mockReturnValue({
      items: [],
      loading: false,
      error: null,
      hasMore: true,
      loadMore: loadMoreMock,
    });

    render(<Home />);
    const loadMoreBtn = screen.getByRole("button", { name: "Load More" });
    fireEvent.click(loadMoreBtn);

    expect(loadMoreMock).toHaveBeenCalled();
  });
});

describe("Pokemon Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    mockUsePokemonDetail.mockReturnValue({
      pokemon: null,
      loading: true,
      error: null,
    });

    render(<PokemonDetailPage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows error state", () => {
    mockUsePokemonDetail.mockReturnValue({
      pokemon: null,
      loading: false,
      error: "Error loading detail",
    });

    render(<PokemonDetailPage />);
    expect(screen.getByTestId("error-state")).toHaveTextContent("Error loading detail");
  });

  it("renders PokemonCard when data is resolved", () => {
    const mockPoke = { id: 1, name: "bulbasaur" };
    mockUsePokemonDetail.mockReturnValue({
      pokemon: mockPoke,
      loading: false,
      error: null,
    });

    render(<PokemonDetailPage />);
    expect(screen.getByTestId("pokemon-card")).toHaveTextContent("bulbasaur");
  });

  it("goes back when Back button is clicked", () => {
    mockUsePokemonDetail.mockReturnValue({
      pokemon: { id: 1, name: "bulbasaur" },
      loading: false,
      error: null,
    });

    render(<PokemonDetailPage />);
    const backBtn = screen.getByRole("button", { name: "Back" });
    fireEvent.click(backBtn);

    expect(mockBack).toHaveBeenCalled();
  });
});
