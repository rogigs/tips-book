import { View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { database } from "../../../firebaseConfig";
import { CircularProgress } from "../../components/CircularProgress";

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

  const openPost = () => navigation.navigate("Post");

  // TODO: Solution for BETA BETA. It will be removed
  useEffect(() => {
    const starCountRef = ref(database, "feed");
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();

        if (data) {
          const transformResponse = Object.entries(data).map(
            ([keyFollowing, valueFollowing]) => ({
              followingId: keyFollowing,
              post: Object.entries(valueFollowing).map(([key, value]) => ({
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
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <WrapperScreenTabs openPost={openPost}>
      <ScrollView scrollEnabled nestedScrollEnabled>
        <View style={styles.wrapper}>
          {posts.map((following) =>
            following.post.map((post) => <Card key={post.postId} {...post} />)
          )}
        </View>
      </ScrollView>
    </WrapperScreenTabs>
  );
}
