import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export default function Index() {
  //estados
  const [user, setUser] = React.useState("");
  const [pw, setPw] = React.useState("");

  const router = useRouter();

  const login = () => {
    if (user == "" || pw == "") {
      alert("Favor de llenar los campos");
    } else {
      if (user == "admin" && pw == "123") {
          router.push('/(tabs)/home')
      } else {
        alert("qn sos?");
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.contenodorPrincipal}>
        <View>
          <Text style={styles.titulo}> react uwu </Text>

          <Text style={{ textAlign: "center", fontSize: 30 }}> login uwu </Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={setUser}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry
          onChangeText={setPw}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View style={styles.contenedorButon}>
          <TouchableOpacity onPress={() => login()} style={styles.Buton1}>
            login
          </TouchableOpacity>
        </View>

        <View style={styles.contenedorButon}>
          {/* <Link href={'/CrearCuenta'} style={styles.Buton2}>Crear Cuenta</Link> */}
          <TouchableOpacity
            onPress={() => router.push("/CrearCuenta")}
            style={styles.Buton1}
          >
            Crear Cuenta
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenodorPrincipal: {
    flex: 1,
  },
  titulo: {
    fontSize: 60,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    fontSize: 20,
    margin: 4,
    borderRadius: 8,
    padding: 5,
    borderWidth: 0.5,
  },
  contenedorButon: {
    marginTop: 10,
    padding: 30,
  },
  Buton1: {
    backgroundColor: "purple",
    color: "white",
    padding: 10,
    borderRadius: 10,
    width: 150,
    textAlign: "center",
  },
  Buton2: {
    backgroundColor: "black",
    color: "white",
    padding: 10,
    borderRadius: 10,
    width: 150,
    textAlign: "center",
  },
});
