import { Text } from "react-native-paper";
import { View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/styles/color";
import { useState } from "react";

const Post = ({ navigation }) => {
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
};

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

export default Post;
