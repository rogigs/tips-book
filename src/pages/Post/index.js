import {
  Text,
  TextInput,
  IconButton,
  Chip,
  RadioButton,
  ActivityIndicator,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ref, onValue, update } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
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
  wrapperRadio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    backgroundColor: COLORS.LIGHT,
  },
});

function Input({ control, name }) {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={(newValue) => onChange(newValue)}
          value={value || ""}
        />
      )}
      name={name}
      rules={{ required: true }}
    />
  );
}

function Post({ navigation }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    state: { userId },
  } = useUser();
  const { setValue, handleSubmit, control, watch } = useForm();

  useEffect(() => {
    const getLeagues = () => {
      const starCountRef = ref(database, "leagues/brazil");
      onValue(starCountRef, (snapshot) => {
        try {
          const data = snapshot.val();
          setLeagues(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      });
    };

    getLeagues();
  }, []);

  const onSubmit = (data) => {
    try {
      update(ref(database, `post/${userId}`), {
        [uuidv4()]: {
          date: new Date(),
          ...data,
        },
      });
      navigation.push("Tabs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titleText}>Selecione a liga</Text>

      {/* TODO: This is not off the best UX */}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {leagues.map((league) => (
            <Chip
              key={league}
              icon="soccer-field"
              elevated
              style={watch("league") === league && styles.chip}
              onPress={() => setValue("league", league)}
            >
              {league}
            </Chip>
          ))}
        </>
      )}

      <Text style={styles.titleText}>Quem irá se enfrentar ?</Text>
      <Input control={control} name="teams" />
      <Text style={styles.titleText}>Adicione um comentário</Text>
      <Input control={control} name="comment" />
      <Text style={styles.titleText}>Qual foi o resultado ?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group
            onValueChange={(newValue) => onChange(newValue)}
            value={value}
          >
            <View style={styles.wrapperRadio}>
              <RadioButton value="Green" />
              <Text>Green</Text>
            </View>
            <View style={styles.wrapperRadio}>
              <RadioButton value="Half green" />
              <Text>Half Green</Text>
            </View>
            <View style={styles.wrapperRadio}>
              <RadioButton value="Red" />
              <Text>Red</Text>
            </View>
            <View style={styles.wrapperRadio}>
              <RadioButton value="Half red" />
              <Text>Half red</Text>
            </View>
            <View style={styles.wrapperRadio}>
              <RadioButton value="Cashout" />
              <Text>Cashout</Text>
            </View>
          </RadioButton.Group>
        )}
        name="result"
        rules={{ required: true }}
      />

      <View style={styles.wrapperIconSend}>
        <IconButton
          icon="send"
          iconColor={COLORS.PRIMARY}
          size={32}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

export default Post;
