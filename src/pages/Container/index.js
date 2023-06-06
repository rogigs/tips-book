import { View } from "react-native";
import Post from "../Post";
import UserProvider, { UserContext } from "../context/User";
import { FAB } from "react-native-paper";
import { useContext } from "react";

const Test = ({ children }) => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <View style={{ flex: 1 }}>
      <Post visible={state.post.modalActivate} hideModal={() => {}} />
      {children}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={dispatch((state) => ({
          ...state,
          post: { modalActivate: true },
        }))}
      />
    </View>
  );
};

const Container = ({ visible, hideModal, children }) => {
  return (
    <UserProvider>
      <Test visible={visible} hideModal={hideModal}>
        {children}
      </Test>
    </UserProvider>
  );
};

const styles = {
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 120,
  },
};

export default Container;
