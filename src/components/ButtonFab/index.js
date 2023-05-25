import { FAB } from "react-native-paper";

export const ButtonFab = ({ openPost }) => {
  return <FAB style={styles.fab} icon="plus" onPress={openPost} />;
};

const styles = {
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 10,
  },
};
