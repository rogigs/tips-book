import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../../assets/styles/colors";
import { auth } from "../../../firebaseConfig";

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY,
    height: "100%",
    gap: 12,
    flex: 1,
  },
  textInput: {
    width: "100%",
  },
  wrapperIconSend: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "right",
    backgroundColor: "red",
  },
});

function CreateAccount({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (inputEmail) => {
    setEmail(inputEmail);
  };

  const onChangePassword = (inputPassword) => {
    setPassword(inputPassword);
  };

  const createUser = () =>
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("EditAccount", {
          tokenId: userCredential._tokenResponse.idToken,
          userId: auth.currentUser.uid,
        });
      })
      .catch((error) => {
        console.error(error);
      });

  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/iconTipsBook.png")}
        style={{ width: 200, height: 200 }}
      />

      <TextInput
        label="Usuário"
        value={email}
        onChangeText={onChangeEmail}
        style={styles.textInput}
      />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={onChangePassword}
        style={styles.textInput}
      />

      <Button
        mode="text"
        size={32}
        onPress={() => navigation.push("Login")}
        textColor={COLORS.LIGHT}
      >
        Voltar
      </Button>

      <Button
        mode="contained"
        size={32}
        onPress={createUser}
        buttonColor={COLORS.LIGHT}
        textColor={COLORS.SECONDARY}
      >
        Criar
      </Button>
    </View>
  );
}

export default CreateAccount;
