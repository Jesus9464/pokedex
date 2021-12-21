import AsyncStorage from "@react-native-async-storage/async-storage";
import { includes, pull } from "lodash";
import { FAVORITE_STORAGE } from "../utils/constants";

export const getPokemonFavoriteApi = async () => {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return JSON.parse(response || "[]");
  } catch (error) {
    throw error;
  }
};

export const addPokemonFavoriteApi = async (id) => {
  try {
    const favorite = await getPokemonFavoriteApi();
    favorite.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorite));
  } catch (error) {
    throw error;
  }
};

export const isPokemonFavoriteApi = async (id) => {
  try {
    const response = await getPokemonFavoriteApi(id);
    return includes(response, id);
  } catch (error) {
    throw error;
  }
};

export const removePokemonFavoriteApi = async (id) => {
  try {
    const favorite = await getPokemonFavoriteApi();
    const newFavorite = pull(favorite, id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorite));
  } catch (error) {
    throw error;
  }
};
