import { storeToRefs } from "pinia";
import { usePokemonStore } from "../store/pokemonStore";
import {
  getPokemonsApi,
  getPokemonByName,
} from "../services/pokemonApiService";
import { getPokemonById } from "../services/pokemonDetailService";

export const usePokemons = () => {
  const pokemonStore = usePokemonStore();
  const {
    pokemons,
    selectedPokemon,
    loading,
    error,
    currentPage,
    itemsPerPage,
    paginatedPokemons,
    totalPages,
    filteredPokemons,
  } = storeToRefs(pokemonStore);

  const loadPokemons = async () => {
    try {
      const pokemonsFromApi = await getPokemonsApi();
      pokemonStore.getPokemons(pokemonsFromApi);
    } catch (err) {
      pokemonStore.error = "Failed to load pokemons";
      console.error(err);
    }
  };

  const pokemonById = async (id) => {
    try {
      const pokemonSelected = await getPokemonById(id);
      pokemonStore.getPokemonById(pokemonSelected);
    } catch (err) {
      pokemonStore.error = "Pokémon no encontrado";
      console.error(err);
    }
  };

  const filterByType = (type) => {
    const lowerCaseType = type.toLowerCase();
    pokemonStore.filterPokemonsByType(lowerCaseType);
    pokemonStore.setCurrentPage(1);
  };

  const getPokeByName = async (name) => {
    try {
      const pokemonSelected = await getPokemonByName(name);
      pokemonStore.getPokemons([pokemonSelected]);
    } catch (err) {
      pokemonStore.error = "Pokémon no encontrado";
      console.error(err);
    }
  };

  const filterByName = (name) => {
    pokemonStore.filterPokemonsByName(name);
  };

  const setCurrentPage = (page) => {
    pokemonStore.setCurrentPage(page);
  };

  const getDataPerPage = () => {
    pokemonStore.paginatedPokemons();
  };

  const clearApp = () => {
    pokemonStore.clearState();
  };

  const setSortOrder = (order) => {
    pokemonStore.setSortOrder(order);
  };

  return {
    clearApp,
    currentPage,
    error,
    filterByName,
    filterByType,
    filteredPokemons,
    getDataPerPage,
    getPokeByName,
    itemsPerPage,
    loading,
    loadPokemons,
    paginatedPokemons,
    pokemonById,
    pokemons,
    selectedPokemon,
    setCurrentPage,
    setSortOrder,
    totalPages,
  };
};
