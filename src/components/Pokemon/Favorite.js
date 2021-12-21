import React, { useState, useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  addPokemonFavoriteApi,
  isPokemonFavoriteApi,
  removePokemonFavoriteApi,
} from "../../api/favorite";

export default function Favorite(props) {
  const { id } = props;
  const [isFavorite, setIsFavorite] = useState(undefined);
  const [reloadCheck, setReloadCheck] = useState(true);
  const Icon = isFavorite ? FontAwesome : FontAwesome5;

  const addFvorite = async () => {
    try {
      await addPokemonFavoriteApi(id);
      onRealoadCheckFavorite();
    } catch (error) {
      throw error;
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id);
      onRealoadCheckFavorite();
    } catch (error) {
      throw error;
    }
  };

  const onRealoadCheckFavorite = () => setReloadCheck(!reloadCheck);

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadCheck]);

  return (
    <Icon
      style={{ marginRight: 20 }}
      name="heart"
      color="#fff"
      size={20}
      onPress={isFavorite ? removeFavorite : addFvorite}
    />
  );
}
