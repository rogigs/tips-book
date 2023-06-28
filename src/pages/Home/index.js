import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";
import { isFollower } from "../../utils/follow";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flex: 1,
    gap: 24,
  },
});

export default function Home({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
              followingId: key,
              post: Object.entries(value).map(([key, value]) => ({
                postId: key,
                ...value,
              })),
            })
          );

          setPosts(transformResponse);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <WrapperScreenTabs openPost={openPost}>
      <ScrollView scrollEnabled nestedScrollEnabled>
        <View style={styles.wrapper}>
          {posts.map((following) =>
            following.post.map((post) => (
              <Card key={post.postId} user={following.followingId} {...post} />
            ))
          )}
        </View>
      </ScrollView>
    </WrapperScreenTabs>
  );
}
