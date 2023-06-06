import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/styles/colors";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authenticationUser = () =>
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.push("Tabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage + errorCode);
      });

  const onChangeEmail = (email) => {
    setEmail(email);
  };

  const onChangePassword = (password) => {
    setPassword(password);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput label="Email" value={email} onChangeText={onChangeEmail} />

      <TextInput
        label="Senha"
        value={password}
        onChangeText={onChangePassword}
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
};

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
  wrapperIconSend: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "right",
    backgroundColor: "red",
  },
});

export default Login;
