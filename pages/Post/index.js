import { Text } from "react-native-paper";
import { View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";

const Post = ({ navigation }) => {
  console.log("🚀 ~ file: index.js:6 ~ Post ~ navigation:", navigation);
  return (
    <View>
      <Text>Comentar</Text>

      <TextInput value={"Text"} onChangeText={(text) => setComment(text)} />

      <IconButton
        icon="send"
        iconColor="green"
        size={24}
        onPress={() => navigation.push("Tabs")}
      />
    </View>
  );
};

export default Post;
