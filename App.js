import User from "./pages/User";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./pages/Home";
import { COLORS } from "./assets/styles/color";
import { Button } from "react-native-paper";
import CreateAccount from "./pages/CreateAccount";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent", // Use transparent to disable the little highlighting oval
  },
};

const WithTab = () => {
  return (
    <Tab.Navigator
      style={styles.tabNavigator}
      barStyle={{ backgroundColor: COLORS.PRIMARY, color: COLORS.LIGHT }}
      inactiveColor={COLORS.SECONDARY}
      activeColor={COLORS.LIGHT}
      tabBarActiveBackgroundColor={COLORS.LIGHT}
      tabBarButton={(props) => <TouchableOpacity {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Button icon="home-account" textColor={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Button icon="account" textColor={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Post" component={Post} />

        <Stack.Screen
          name="Tabs"
          component={WithTab}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: COLORS.SECONDARY,
  },
});

export default App;
