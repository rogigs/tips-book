import { FAB } from "react-native-paper";
import { COLORS } from "../../assets/styles/colors";

const styles = {
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor: COLORS.SECONDARY,
  },
};


export function ButtonFab({ openPost }) {
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={openPost}
      color={COLORS.LIGHT}
    />
  );
}

