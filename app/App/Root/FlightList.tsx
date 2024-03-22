import { Filter, Flight } from "../../../types/types";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CircleRightIcon } from "../../../assets/vector/ChevronCircleRight";
import { Colors } from "../../../constants";

function getValueByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

interface FlightListProps {
  data: Flight[];
  selectedFlight: Flight | null;
  filter: Filter;
  onDetailScreenPress: () => void;
  setSelectedFlight: (flight: Flight | null) => void;
}

export default function FlightList({
  data,
  selectedFlight,
  filter,
  onDetailScreenPress,
  setSelectedFlight,
}: FlightListProps) {
  const renderFlights: ListRenderItem<Flight> = ({ item }) => {
    const isSelected = selectedFlight?.id === item.id;
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity
            style={isSelected ? styles.selectedBtn : styles.btn}
            onPress={
              isSelected
                ? () => setSelectedFlight(null)
                : () => setSelectedFlight(item)
            }
          >
            <Text style={isSelected ? styles.white : styles.gray}>
              {getValueByPath(item, filter.key)}
            </Text>
          </TouchableOpacity>
        </View>
        {isSelected && (
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => onDetailScreenPress()}>
              <CircleRightIcon />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const separator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderFlights}
      ItemSeparatorComponent={separator}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    height: 400,
  },
  container: {
    height: 70,
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
  },

  btn: {
    height: 70,
    width: 246,
    backgroundColor: Colors.cream,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  selectedBtn: {
    height: 70,
    width: 246,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: Colors.white,
  },
  gray: {
    color: Colors.gray,
  },
  separator: {
    height: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 30,
    height: "100%",
    justifyContent: "center",
  },
});
