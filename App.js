import User from "./pages/User";
import Post from "./pages/Post";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "./pages/Home";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const WithTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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

export default App;
