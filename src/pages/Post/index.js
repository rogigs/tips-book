import { Text, TextInput, IconButton, Chip } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ref, onValue, update } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";
import { COLORS } from "../../assets/styles/colors";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    display: "flex",
    gap: 12,
  },
  titleText: {
    marginBottom: 12,
    fontSize: 18,
  },
  wrapperIconSend: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "right",
  },
});

function Post({ navigation }) {
  const [leagues, setLeagues] = useState([]);
  const [leagueChoose, setLeagueChoose] = useState("");
  const [teamsMatch, setTeamsMatch] = useState("");
  const [comment, setComment] = useState("");
  const {
    state: { userId },
  } = useUser();

  const onChangeTeamsMatch = (inputText) => {
    setTeamsMatch(inputText);
  };

  const onChangeComment = (inputText) => {
    setComment(inputText);
  };

  const writeUserData = () => {
    try {
      update(ref(database, `post/${userId}`), {
        [uuidv4()]: {
          comment,
          teamsMatch,
          league: leagueChoose,
          date: new Date(),
        },
      });

      navigation.push("Tabs");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getLeagues = () => {
      const starCountRef = ref(database, "leagues/brazil");
      onValue(starCountRef, (snapshot) => {
        try {
          const data = snapshot.val();
          setLeagues(data);
        } catch (error) {
          console.error(error);
        }
      });
    };

    getLeagues();

    return () => {
      // TODO: use useReducer
      setLeagues("");
      setLeagueChoose("");
      setTeamsMatch("");
      setComment("");
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Selecione a liga</Text>
      {leagues.map((league) => (
        <Chip
          key={league}
          icon="soccer-field"
          onPress={() => setLeagueChoose(league)}
        >
          {league}
        </Chip>
      ))}

      <Text style={styles.titleText}>Quem irá se enfrentar?</Text>
      <TextInput value={teamsMatch} onChangeText={onChangeTeamsMatch} />

      <Text style={styles.titleText}>Adicione um comentário</Text>
      <TextInput value={comment} onChangeText={onChangeComment} />
      <View style={styles.wrapperIconSend}>
        <IconButton
          icon="send"
          iconColor={COLORS.PRIMARY}
          size={32}
          onPress={writeUserData}
        />
      </View>
    </View>
  );
}

export default Post;
