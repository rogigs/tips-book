import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { View, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  const openPost = () => navigation.navigate("Post");

  return (
    <WrapperScreenTabs openPost={openPost}>
      <View style={styles.wrapper}>
        <Card />
      </View>
    </WrapperScreenTabs>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
});
