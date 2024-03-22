import { StyleSheet, TextInput, View } from "react-native";

import { Button } from "./Button";
import { Colors } from "../constants";
import React from "react";
import { SearchRocketIcon } from "../assets/vector";

interface SearchInputProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  onPress: () => void;
}

export default function SearchInput({
  label,
  onPress,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <View style={styles.fullContainer}>
      <View style={styles.inputContainer}>
        <SearchRocketIcon style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={label}
          placeholderTextColor={Colors.beige}
          value={value}
          onChangeText={onChange}
        />
      </View>
      <Button
        text="SEARCH"
        white={false}
        style={styles.button}
        textSize={12}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16.5,
    width: 224,
    height: 33,
    backgroundColor: Colors.db,
    marginLeft: 15,
  },
  icon: {
    marginHorizontal: 20,
    color: Colors.beige,
  },
  input: {
    flex: 1,
    color: Colors.beige,
    height: 20,
  },
  button: {
    width: 98,
    height: 33,
    backgroundColor: Colors.orange,
    fontSize: 12,
    borderRadius: 16.5,
  },
});
