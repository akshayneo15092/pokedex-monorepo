const React = require("react");

module.exports = {
  PokemonListCard: ({ pokemon }) => React.createElement("div", { "data-testid": "pokemon-list-card" }, pokemon.name),
  PokemonCard: ({ pokemon }) => React.createElement("div", { "data-testid": "pokemon-card" }, pokemon.name),
  Loader: () => React.createElement("div", { "data-testid": "loader" }, "Loading..."),
  ErrorState: ({ message, onRetry }) => {
    return React.createElement(
      "div",
      { "data-testid": "error-state" },
      React.createElement("span", null, message),
      onRetry ? React.createElement("button", { onClick: onRetry }, "Retry") : null
    );
  },
  EmptyState: () => React.createElement("div", { "data-testid": "empty-state" }, "No Pokémon Found"),
  PageHeader: ({ title, subtitle }) => {
    return React.createElement(
      "div",
      { "data-testid": "page-header" },
      React.createElement("h1", null, title),
      subtitle ? React.createElement("p", null, subtitle) : null
    );
  },
};
