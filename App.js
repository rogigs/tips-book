import {  Linking, Platform } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { Text } from "react-native-paper";
import { UserProvider } from "./src/context/useUser";
import { Auth as AuthMobile } from "./src/pages/Auth/mobile";

const PERSISTENCE_KEY = "Login";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: "transparent", // Use transparent to disable the little highlighting oval
  },
};

function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  const isWeb = Platform.OS === "web"

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (!isWeb && initialUrl == null) {
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
        {isWeb ? <Text>TESTE</Text>: <AuthMobile />} 
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
