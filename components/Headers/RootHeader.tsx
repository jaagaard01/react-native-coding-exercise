import { AppLogo, PlanetIcon, RocketIcon } from "../../assets/vector";
import { Colors, Fonts } from "../../constants";
import { StyleSheet, View } from "react-native";

import { FC } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const RootHeader: FC = () => {
  return (
    <View style={styles.topContainer}>
      <PlanetIcon style={styles.planet} />
      <AppLogo style={styles.logo} />
      <RocketIcon style={styles.rocket} />
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    height: 140,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.db,
    position: "relative",
  },

  planet: {
    flex: 1,
    height: 40,
    marginLeft: 30,
  },
  logo: {
    flex: 6,
    height: 95,
    resizeMode: "contain",
    alignSelf: "center",
  },
  rocket: {
    width: 66,
    height: 150,
    marginTop: 10,
    zIndex: 150,
  },
});
