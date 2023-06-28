import { Avatar, Card as CardPaper, Text } from "react-native-paper";

function LeftContent(props) {
  return <Avatar.Icon {...props} icon="folder" />;
}

export function Card({ user, comment, league, teamsMatch, date }) {
  return (
    <CardPaper style={{ padding: 12 }}>
      <CardPaper.Title title={user} subtitle={date} left={LeftContent} />
      <CardPaper.Content>
        <Text variant="titleLarge">
          {league} - {teamsMatch}
        </Text>
        <Text variant="bodyMedium">{comment}</Text>
      </CardPaper.Content>
      <CardPaper.Cover source={{ uri: "https://picsum.photos/700" }} />
    </CardPaper>
  );
}
