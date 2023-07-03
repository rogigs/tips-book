import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { StyleSheet, View } from "react-native";
import { Card } from "../../../../components/Card";
import { database } from "../../../../../firebaseConfig";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    flex: 1,
    gap: 24,
  },
});

export function Posts({ ownerProfile }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const starCountRef = ref(database, `post/${ownerProfile}`);
    onValue(starCountRef, (snapshot) => {
      try {
        const data = snapshot.val();

        if (data) {
          const transformResponse = Object.entries(data).map(
            ([key, value]) => ({
              postId: key,
              ...value,
            })
          );

          setPosts(transformResponse);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      {posts.map((post) => (
        <Card key={post.postId} user={ownerProfile} {...post} />
      ))}
    </View>
  );
}
