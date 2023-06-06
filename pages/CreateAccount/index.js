import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/styles/color";
import { useState } from "react";

const CreateAccount = ({ navigation }) => {
  const [text, setText] = useState("");

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput label="Usuário" value={text} onChangeText={onChangeText} />

      <TextInput label="Senha" value={text} onChangeText={onChangeText} />

      <Button
        mode="contained"
        size={32}
        onPress={() => navigation.push("Tabs")}
        buttonColor={COLORS.LIGHT}
        textColor={COLORS.SECONDARY}
      >
        Criar
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

export default CreateAccount;