import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../hooks/useReduxHooks";

import { BackButton } from "../../../assets/vector/BackButton";
import { Button } from "../../../components";
import { Colors } from "../../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketBackground } from "../../../assets/vector/TicketBackground";
import { TicketPageBackground } from "../../../assets/vector/TicketPageBackground";
import { resetFlightInfo } from "../../../store";
import { router } from "expo-router";

export default function Ticket() {
  const dispatch = useAppDispatch();
  const flightInfo = useAppSelector((state) => state.flightInfo);

  const onBack = () => {
    router.back();
    dispatch(resetFlightInfo());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={onBack}>
          <BackButton />
        </TouchableOpacity>
      </View>
      <View style={styles.backgroundContainer}>
        <TicketPageBackground style={styles.backgroundSvg} />
      </View>
      <View style={styles.contentContainer}>
        <TicketBackground style={styles.centeredSvg} />
        <View style={styles.ticketInfoContainer}>
          <View>
            <View style={styles.topTicketContent}>
              <Text style={styles.ticketTextTitle}>Mission Name</Text>
              <Text style={styles.ticketTextMissionName}>
                {flightInfo.mission_name}
              </Text>
            </View>
            <View style={styles.bottomTicketContent}>
              <View>
                <Text style={styles.ticketTextTitle}>Rocket Name</Text>
                <Text style={styles.ticketTextInfo}>
                  {flightInfo.rocket.rocket_name}
                </Text>
              </View>
              <View>
                <Text style={styles.ticketTextTitle}>Rocket Type</Text>
                <Text style={styles.ticketTextInfo}>
                  {flightInfo.rocket.rocket_type}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button onPress={onBack} style={styles.button} text="Print Ticket" />
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
    zIndex: 10,
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
  ticketInfoContainer: {
    position: "absolute",
    top: "27%",
    left: 45,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "90deg" }],
  },
  topTicketContent: {
    marginBottom: 20,
  },
  ticketTextTitle: {
    fontSize: 7,
    color: Colors.beige,
    margin: 2,
  },
  ticketTextMissionName: {
    fontSize: 20,
    color: Colors.beige,
    margin: 2,
  },
  ticketTextInfo: {
    fontSize: 9,
    color: Colors.beige,
    margin: 2,
  },
  bottomTicketContent: {
    display: "flex",
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
  },
});
