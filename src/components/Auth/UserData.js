import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Button, View, Text } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { size } from "lodash";
import { getPokemonFavoriteApi } from "../../api/favorite";

export default function UserData() {
  const [totalPokemon, setTotalPokemon] = useState(0);
  const { auth, logout } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const totalFavorite = await getPokemonFavoriteApi();
          setTotalPokemon(size(totalFavorite));
        } catch (error) {
          setTotalPokemon(0);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido,</Text>
        <Text style={styles.title}>{`${auth.firstName} ${auth.lastName}`}</Text>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="User Name" text={auth.username} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total favoritos" text={`${totalPokemon} pokemon  `} />
      </View>

      <Button style={styles.btlLogout} title="Cerrar Sesìon" onPress={logout} />
    </View>
  );
}

function ItemMenu(props) {
  const { title, text } = props;
  return (
    <View style={styles.itemMenu}>
      <Text style={styles.itemMenuTitle}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#cfcfcf",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },

  btlLogout: {
    paddingTop: 20,
  },
});
