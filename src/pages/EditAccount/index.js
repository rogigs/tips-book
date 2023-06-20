import { View, StyleSheet } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { useUser } from "../../context/useUser";
import { COLORS } from "../../assets/styles/colors";
import { database } from "../../../firebaseConfig";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    display: "flex",
    gap: 12,
  },
});

export default function EditAccount({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const [username, setUsername] = useState(route.params.username);
  const {
    state: { userId },
  } = useUser();

  const openPost = () => navigation.navigate("Post");

  const onChangeName = (inputText) => {
    setName(inputText);
  };

  const onChangeUsername = (inputText) => {
    setUsername(inputText);
  };

  const changeEditAccount = () => {
    try {
      const userRef = ref(database, `user/${userId}`);

      set(userRef, {
        name,
        username,
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WrapperScreenTabs openPost={openPost}>
      <View style={styles.wrapper}>
        <Text style={styles.titleText}>Nome de usuário</Text>
        <TextInput value={name} onChangeText={onChangeName} />
        <Text style={styles.titleText}>Nome de username</Text>
        <TextInput value={username} onChangeText={onChangeUsername} />

        <View style={styles.wrapperIconSend}>
          <IconButton
            icon="send"
            iconColor={COLORS.PRIMARY}
            size={32}
            onPress={changeEditAccount}
          />
        </View>
      </View>
    </WrapperScreenTabs>
  );
}
