import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-paper'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from '../../Login';
import Home from '../../Home';

const config = {
  screens: {
    Home: '/',
    Login: 'login',
  },
};

const linking = {
  prefixes: ['http://localhost:19008/', 'localhost:19008://'],
  config,
};

const Stack = createNativeStackNavigator();

export function Auth() {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
         <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



