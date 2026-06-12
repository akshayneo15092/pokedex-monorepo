const mockUsePokemonList = jest.fn(() => ({
  items: [],
  loading: false,
  error: null,
  hasMore: false,
  loadMore: jest.fn(),
}));

const mockUsePokemonDetail = jest.fn(() => ({
  pokemon: null,
  loading: false,
  error: null,
}));

module.exports = {
  usePokemonList: mockUsePokemonList,
  usePokemonDetail: mockUsePokemonDetail,
};
