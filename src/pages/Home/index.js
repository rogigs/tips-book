import { View, StyleSheet } from "react-native";
import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
  },
});


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

