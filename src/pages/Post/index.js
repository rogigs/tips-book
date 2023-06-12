import { Text , TextInput, IconButton } from "react-native-paper";
import { View , StyleSheet } from "react-native";


import { useState } from "react";
import { COLORS } from "../../assets/styles/colors";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
  titleText: {
    marginBottom: 12,
    fontSize: 18,
  },
  wrapperIconSend: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "right",
  },
});

function Post({ navigation }) {
  const [text, setText] = useState("");

  const onChangeText = (inputText) => {
    setText(inputText);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Comente sua aposta</Text>

      <TextInput value={text} onChangeText={onChangeText} />

      <View style={styles.wrapperIconSend}>
        <IconButton
          icon="send"
          iconColor={COLORS.PRIMARY}
          size={32}
          onPress={() => navigation.push("Tabs")}
        />
      </View>
    </View>
  );
}


export default Post;
