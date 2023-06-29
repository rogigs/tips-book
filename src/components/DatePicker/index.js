import React, { createElement } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export function DatePickerMy({ onChange, value = new Date() }) {
  if (Platform.OS === "web") {
    return createElement("input", {
      type: "date",
      value,
      onChange,
      style: {
        height: 30,
        padding: 5,
        border: "2px solid #677788",
        borderRadius: 5,
        width: 250,
      },
    });
  }

  return (
    <DateTimePicker
      value={value}
      mode="date"
      is24Hour
      onChange={(newValue) =>
        onChange(new Date(newValue?.nativeEvent?.timestamp))
      }
    />
  );
}
