import { Avatar, Button, Card as CardPaper, Text } from "react-native-paper";
import { COLORS } from "../../assets/styles/colors";

function LeftContent(props) {
  return <Avatar.Icon {...props} icon="folder" />;
}

export function Card({ actions = true }) {
  return (
    <CardPaper style={{ padding: 12 }}>
      <CardPaper.Title title="Name" subtitle="@username" left={LeftContent} />
      <CardPaper.Content>
        <Text variant="titleLarge">Liga - Jogo</Text>
        <Text variant="bodyMedium">Tips...</Text>
      </CardPaper.Content>
      <CardPaper.Cover source={{ uri: "https://picsum.photos/700" }} />
      {actions && (
        <CardPaper.Actions>
          <Button buttonColor={COLORS.PRIMARY} textColor={COLORS.LIGHT}>
            Like
          </Button>
          <Button buttonColor={COLORS.RED} textColor={COLORS.LIGHT}>
            Unlike
          </Button>
        </CardPaper.Actions>
      )}
    </CardPaper>
  );
}
