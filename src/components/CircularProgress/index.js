import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../../assets/styles/colors";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export function CircularProgress() {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color={COLORS.SECONDARY} />
    </View>
  );
}
