import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDatails } from "../../utils/userDB";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      const { username, password } = formData;

      if (username !== user.username || password !== user.password) {
        setError("Usuario o contraseña incorrectas");
      } else {
        login(userDatails);
      }
    },
  });

  return (
    <View>
      <Text style={styles.title}>Iniciar sesíon</Text>
      <TextInput
        placeholder="Nombre de Usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text) => formik.setFieldValue("username", text)}
      />
      {formik.errors?.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      {formik.errors?.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <Button title="Entrar" onPress={formik.handleSubmit} />
      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const initialValue = () => ({ username: "jesus9464", password: "123456" });

const validationSchema = () => {
  return {
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es requerida"),
  };
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: "#f00",
    marginTop: 2,
    marginLeft: 18,
  },
});
