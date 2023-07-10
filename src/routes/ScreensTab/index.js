/* eslint-disable react/no-unstable-nested-components */

import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Button } from "react-native-paper";
import User from "../../pages/User";
import Home from "../../pages/Home";
import { COLORS } from "../../assets/styles/colors";

import EditAccount from "../../pages/EditAccount";

const Stack = createNativeStackNavigator();
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

export function ScreensTab() {
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

