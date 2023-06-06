import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { useEffect } from "react";
import { getUsers } from "../../routes";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../assets/styles/colors";

export default function User({ navigation }) {
  const openPost = () => navigation.navigate("Post");

  useEffect(() => {
    console.log(
      getUsers()
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    );
  }, []);

  return (
    <WrapperScreenTabs openPost={openPost}>
      <LinearGradient
        colors={[COLORS.SECONDARY, "transparent"]}
        style={styles.container}
      >
        <Avatar.Image size={24} source={require("../../assets/favicon.png")} />
        <Text style={styles.title}>Username</Text>
        <Text>@username</Text>
      </LinearGradient>
    </WrapperScreenTabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 170,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
