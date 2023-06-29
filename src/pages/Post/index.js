import {
  Text,
  TextInput,
  IconButton,
  Chip,
  RadioButton,
  ActivityIndicator,
} from "react-native-paper";
import { View, StyleSheet, Platform } from "react-native";
import { ref, onValue, update } from "firebase/database";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { isAfter, startOfDay, isToday, parseISO } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../assets/styles/colors";
import { database } from "../../../firebaseConfig";
import { useUser } from "../../context/useUser";
import { DatePickerMy } from "../../components/DatePicker";

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
    justifyContent: "flex-end",
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

  const onSubmit = async (data) => {
    const user = await AsyncStorage.getItem("user");

    const updateStorage = onValue(
      ref(database, `user/${userId}`),
      async (snapshot) => {
        try {
          const { name, username } = snapshot.val();

          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ name, username })
          );

          return { name, username };
        } catch (error) {
          console.error(error);

          return { name: "ERROR", username: "ERROR" };
        }
      }
    );

    const objPost = {
      [uuidv4()]: {
        postDate: new Date(),
        user: user ? JSON.parse(user) : updateStorage(),
        ...data,
      },
    };

    try {
      update(ref(database, `post/${userId}`), objPost);
    } catch (error) {
      console.error(error);
    }

    const date =
      Platform.OS === "web" ? parseISO(data.dateMatch) : data.dateMatch;

    const today = new Date();
    // TODO: Create a script to delete feed
    if (isToday(date) || isAfter(date, today)) {
      try {
        update(ref(database, `feed/${userId}`), objPost);
      } catch (error) {
        console.error(error);
      }
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
      <Text style={styles.titleText}>Data da partida ?</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.wrapperRadio}>
            <DatePickerMy value={value} onChange={onChange} />
          </View>
        )}
        name="dateMatch"
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
