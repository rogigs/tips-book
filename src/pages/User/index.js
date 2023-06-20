import { StyleSheet, View } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { COLORS } from "../../assets/styles/colors";
import { Card } from "../../components/Card";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";
import { buttonProperties as buttonPropertiesFn } from "./utils";

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
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isAFollower, setIsAFollower] = useState(false);

  const openPost = () => navigation.navigate("Post");
  const { state } = useUser();

  const userIdOfProfileVisited = route.params?.userIdOfProfileVisited;
  const ownerProfile = userIdOfProfileVisited ?? state.userId;

  const followUser = () => {
    try {
      const postListRef = ref(database, "follows");

      set(postListRef, {
        [state.userId]: {
          following: {
            [ownerProfile]: !isAFollower,
          },
        },
        [ownerProfile]: {
          follower: {
            [state.userId]: !isAFollower,
          },
        },
      });

      setIsAFollower(!isAFollower);
    } catch (error) {
      console.error(error);
    }
  };

  const buttonProperties = buttonPropertiesFn({
    visitor: userIdOfProfileVisited,
    follower: isAFollower,
    onPress: () => followUser(),
  });

  useEffect(() => {
    const starCountRef = ref(database, `post/${ownerProfile}`);
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();

        if (data) {
          const transformResponse = Object.entries(data).map(
            ([key, value]) => ({
              user: key,
              postId: Object.keys(value)[0],
              post: Object.values(value)[0],
            })
          );

          setPosts(transformResponse);
        }
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
        if (data?.follower) {
          setFollowers(Object.keys(data?.follower));
          setIsAFollower(
            Object.entries(data?.follower).some(
              (follower) => follower[0] === state.userId && follower[1] === true
            )
          );
        }

        if (data?.following) {
          setFollowing(Object.keys(data?.following));
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, [isAFollower]);

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
            onPress={buttonProperties.onPress}
            buttonColor={buttonProperties.color}
            textColor={buttonProperties.textColor}
            icon={buttonProperties.icon}
          >
            {buttonProperties.name}
          </Button>
        </View>
      </LinearGradient>

      {posts.map((post) => (
        <Card key={post.postId} {...post} />
      ))}
    </WrapperScreenTabs>
  );
}
