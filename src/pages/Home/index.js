import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { COLORS } from "../../assets/styles/colors";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";
import { isFollower } from "../../utils/follow";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
});

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  const [following, setFollowing] = useState();
  const { state } = useUser();

  const openPost = () => navigation.navigate("Post");

  // TODO: That need other solution
  useEffect(() => {
    const starCountRef = ref(database, "post");
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
  }, [following]);

  useEffect(() => {
    const starCountRef = ref(database, `follows/${state.userId}/following`);
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();

        setFollowing(isFollower(data));
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <WrapperScreenTabs openPost={openPost}>
      <View style={styles.wrapper}>
        {posts.map((post) => (
          <Card key={post.postId} {...post} />
        ))}

        <Button
          mode="elevated"
          size={32}
          onPress={() => {
            navigation.navigate("UserVisited", {
              userIdOfProfileVisited: "5xb9tD29ieffXDagAKHmteS1pQ23",
            });
          }}
          buttonColor={COLORS.SECONDARY}
          textColor={COLORS.LIGHT}
        >
          Testar Perfil
        </Button>
      </View>
    </WrapperScreenTabs>
  );
}
