import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";
import { COLORS } from "../../assets/styles/colors";

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
