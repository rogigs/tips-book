import { Avatar, Button, Card as CardPaper, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const Card = () => (
  <CardPaper>
    <CardPaper.Title title="Name" subtitle="@username" left={LeftContent} />
    <CardPaper.Content>
      <Text variant="titleLarge">Liga - Jogo</Text>
      <Text variant="bodyMedium">Tips...</Text>
    </CardPaper.Content>
    <CardPaper.Cover source={{ uri: "https://picsum.photos/700" }} />
    <CardPaper.Actions>
      <Button>Like</Button>
      <Button>Unlike</Button>
    </CardPaper.Actions>
  </CardPaper>
);
