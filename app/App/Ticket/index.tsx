import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BackButton } from "../../../assets/vector/BackButton";
import { Button } from "../../../components";
import { Colors } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketBackground } from "../../../assets/vector/TicketBackground";
import { TicketPageBackground } from "../../../assets/vector/TicketPageBackground";
import { router } from "expo-router";

export default function Ticket() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.backgroundContainer}>
        <TicketPageBackground style={styles.backgroundSvg} />
      </View>
      <View style={styles.contentContainer}>
        <TicketBackground style={styles.centeredSvg} />
        <Button
          onPress={() => router.back()}
          style={styles.button}
          text="Print Ticket"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backButtonContainer: {
    left: 10,
    padding: 16,
    position: "absolute",
    top: 40,
  },
  backgroundContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  backgroundSvg: {
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  centeredSvg: {
    transform: [{ rotate: "90deg" }],
  },
  button: {
    backgroundColor: Colors.orange,
    borderRadius: 16.5,
    bottom: 25,
    fontSize: 12,
    height: 33,
    position: "absolute",
    width: 141,
  },
});
