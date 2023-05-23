import { View } from "react-native";
import { ButtonFab } from "../ButtonFab";

export const WrapperScreenTabs = ({ openPost, children }) => {
  return (
    <View style={{ flex: 1 }}>
      {children}
      <ButtonFab openPost={openPost} />
    </View>
  );
};
