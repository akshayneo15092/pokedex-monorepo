const mockPush = jest.fn();
const mockBack = jest.fn();
const mockRefresh = jest.fn();

const useRouter = () => ({
  push: mockPush,
  back: mockBack,
  forward: jest.fn(),
  refresh: mockRefresh,
  replace: jest.fn(),
  prefetch: jest.fn(),
});

const useParams = () => ({
  name: "bulbasaur",
});

module.exports = {
  useRouter,
  useParams,
  mockPush,
  mockBack,
  mockRefresh,
};
