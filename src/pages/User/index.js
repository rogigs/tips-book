import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { useEffect, useState } from "react";
import { getUsers } from "../../routes";

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
      <View style={styles.container}>
        <Avatar.Image size={24} source={require("../../assets/favicon.png")} />
        <Text style={styles.title}>Username</Text>
        <Text>@username</Text>
        <View style={styles.containerNumbers}>
          <View>
            <Text>120</Text>
            <Text>Greens</Text>
          </View>
          <View>
            <Text>10</Text>
            <Text>Reds</Text>
          </View>
          <View>
            <Text>10</Text>
            <Text>Seguidores</Text>
          </View>
          <View>
            <Text>10</Text>
            <Text>Seguindo</Text>
          </View>
        </View>
      </View>
    </WrapperScreenTabs>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  containerNumbers: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    alignItems: "center",
    textAlign: "center",
    marginTop: 24,
  },
});
