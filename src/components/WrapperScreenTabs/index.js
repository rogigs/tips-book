import { View, StyleSheet } from "react-native";
import { ButtonFab } from "../ButtonFab";
import { COLORS } from "../../assets/styles/colors";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
  },
});

export function WrapperScreenTabs({ openPost, children }) {
  return (
    <View style={styles.wrapper}>
      {children}
      <ButtonFab openPost={openPost} />
    </View>
  );
}


