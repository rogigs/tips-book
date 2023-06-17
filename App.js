import { StyleSheet, TouchableOpacity, Linking, Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import User from "./src/pages/User";
import Post from "./src/pages/Post";
import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import { COLORS } from "./src/assets/styles/colors";
import CreateAccount from "./src/pages/CreateAccount";
import { UserProvider, useUser } from "./src/context/useUser";

const PERSISTENCE_KEY = "Login";
const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent", // Use transparent to disable the little highlighting oval
  },
};

const styles = StyleSheet.create({
  tabNavigator: {
    backgroundColor: COLORS.SECONDARY,
  },
});

function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserVisited"
        component={User}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
function WithTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      style={styles.tabNavigator}
      barStyle={{ backgroundColor: COLORS.PRIMARY, color: COLORS.LIGHT }}
      inactiveColor={COLORS.SECONDARY}
      activeColor={COLORS.LIGHT}
      tabBarActiveBackgroundColor={COLORS.LIGHT}
      tabBarButton={(props) => <TouchableOpacity {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
}

function Auth() {
  const { state } = useUser();

  const authenticationUser = state.tokenId;

  return (
    <Stack.Navigator>
      {authenticationUser ? (
        <>
          <Stack.Screen
            name="Tabs"
            component={WithTab}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Post" component={Post} options={{ title: "" }} />
        </>
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== "web" && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer
        theme={theme}
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
        <Auth />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
