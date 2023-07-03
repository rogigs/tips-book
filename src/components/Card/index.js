import { Avatar, Card as CardPaper, Text } from "react-native-paper";
import { COLORS } from "../../assets/styles/colors";

function LeftContent(props) {
  return (
    <Avatar.Icon
      color={COLORS.LIGHT}
      icon="account"
      style={{ backgroundColor: COLORS.SECONDARY }}
      {...props}
    />
  );
}

function RightContent({ date }) {
  return <Text>Compartilhado em: {date}</Text>;
}

export function Card({
  user: { name, username },
  comment,
  league,
  teamsMatch,
  postDate,
}) {
  return (
    <CardPaper style={{ padding: 12 }}>
      <CardPaper.Title
        title={name}
        subtitle={`@${username}`}
        left={LeftContent}
        right={() => <RightContent date={postDate} />}
      />
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
