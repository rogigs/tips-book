import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ref, onValue, set, push } from "firebase/database";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { COLORS } from "../../assets/styles/colors";
import { Card } from "../../components/Card";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 270,
    gap: 12,
  },
  TextInput: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  containerButtonsToFollow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
});

export default function User({ navigation, route }) {
  const [posts, setPosts] = useState({});
  const [following, setFollowing] = useState({});
  const [followers, setFollowers] = useState({});

  const openPost = () => navigation.navigate("Post");
  const { state, dispatch } = useUser();

  const ownerProfile = route.params?.userIdOfProfileVisited ?? state.userId;

  const followUser = () => {
    const postListRef = ref(database, "follows");
    set(postListRef, {
      [state.userId]: {
        following: {
          [ownerProfile]: true,
        },
      },
      [ownerProfile]: {
        follower: {
          [state.userId]: true,
        },
      },
    });
  };

  useEffect(() => {
    const starCountRef = ref(database, `post/${ownerProfile}`);
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();
        setPosts(data);
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(database, `follows/${ownerProfile}`);
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();
        setFollowers(Object.keys(data.follower || {}));
        setFollowing(Object.keys(data.following || {}));
      } catch (error) {
        console.error(error);
      }
    });
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
        <View style={styles.containerButtonsToFollow}>
          <Text>Seguidores {followers.length}</Text>
          <Text>| </Text>
          <Text>Seguindo {following.length}</Text>
        </View>
        <View style={styles.containerButtonsToFollow}>
          <Button
            mode="elevated"
            size={32}
            onPress={followUser}
            buttonColor={COLORS.SECONDARY}
            textColor={COLORS.LIGHT}
          >
            Seguir
          </Button>
        </View>
      </LinearGradient>
      <View>
        <Card actions={false} {...posts} />
      </View>
    </WrapperScreenTabs>
  );
}
