import { View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../../assets/styles/colors";
import { auth } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";
import { ACTION_TYPES as ACTION_TYPES_USER } from "../../context/useUser/actions";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
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

function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useUser();

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const authenticationUser = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch({
          type: ACTION_TYPES_USER.SET_ID_TOKEN,
          payload: {
            tokenId: userCredential._tokenResponse.idToken,
            userId: auth.currentUser.uid,
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage + errorCode);
      });

  return (
    <View style={styles.wrapper}>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/iconTipsBook.png")}
        style={{ width: 200, height: 200 }}
      />
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={onChangeEmail}
        style={styles.textInput}
      />

      <TextInput
        mode="outlined"
        label="Senha"
        value={password}
        onChangeText={onChangePassword}
        style={styles.textInput}
        secureTextEntry
      />

      <Button
        mode="text"
        size={32}
        onPress={() => navigation.push("CreateAccount")}
        textColor={COLORS.LIGHT}
      >
        Crie sua conta
      </Button>

      <Button
        mode="contained"
        size={32}
        onPress={authenticationUser}
        buttonColor={COLORS.LIGHT}
        textColor={COLORS.SECONDARY}
      >
        Entrar
      </Button>
    </View>
  );
}

export default Login;
