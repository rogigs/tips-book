import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../Home';
import { useUser } from '../../../context/useUser';
import Login from '../../Login';
import User from "../../User";
import Post from "../../Post";
import CreateAccount from '../../CreateAccount';
import EditAccount from '../../EditAccount';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { COLORS } from '../../../assets/styles/colors';
import { StyleSheet } from "react-native";

import { Button } from "react-native-paper";

const Stack = createStackNavigator();

const config = {
  initialRouteName: 'Login',
  screens: {
    Login: '/',
  },
};

const linking = {
  config,
};

const Tab = createMaterialBottomTabNavigator();


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

function PostScreen() {
  return (
    <Stack.Navigator initialRouteName="Account">
      <Stack.Screen
        name="Account"
        component={User}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ title: "Editar" }}
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
        component={PostScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Button icon="account" textColor={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}



export function Auth() {
  const { state } = useUser();

  const authenticationUser = state.tokenId;

  return (
    <NavigationContainer linking={linking}>

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
            <Stack.Screen
              name="EditAccount"
              component={EditAccount}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
