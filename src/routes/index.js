/* eslint-disable react/no-unstable-nested-components */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import CreateAccount from "../pages/CreateAccount";
import { useUser } from "../context/useUser";
import EditAccount from "../pages/EditAccount";
import { ScreensTab } from "./ScreensTab";
import Post from "../pages/Post";

const Stack = createNativeStackNavigator();

export function Routes() {
    const { state } = useUser();

    const authenticationUser = state.tokenId;

    return (
        <Stack.Navigator>
            {authenticationUser ? (
                <>
                    <Stack.Screen
                        name="Tabs"
                        component={ScreensTab}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Post" component={Post} options={{ title: "Post" }} />
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
    );
}
