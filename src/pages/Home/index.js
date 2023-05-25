import { Card } from "../../components/Card";
import { WrapperScreenTabs } from "../../components/WrapperScreenTabs";

export default function Home({ navigation }) {
  const openPost = () => navigation.navigate("Post");

  return (
    <WrapperScreenTabs openPost={openPost}>
      <Card />
    </WrapperScreenTabs>
  );
}
