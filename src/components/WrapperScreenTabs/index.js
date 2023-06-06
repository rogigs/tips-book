import { View, StyleSheet } from "react-native";
import { ButtonFab } from "../ButtonFab";
import { COLORS } from "../../assets/styles/colors";

export const WrapperScreenTabs = ({ openPost, children }) => {
  return (
    <View style={styles.wrapper}>
      {children}
      <ButtonFab openPost={openPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
  },
});
