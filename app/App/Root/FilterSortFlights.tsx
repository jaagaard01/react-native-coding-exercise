import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../../constants";
import { FILTER_OPTIONS } from "../../../constants/Constants";
import { Filter } from "../../../types/types";
import { FilterIcon } from "../../../assets/vector/FilterIcon";
import { SortIcon } from "../../../assets/vector/SortIcon";
import { useState } from "react";

interface FilterSortProps {
  filter: Filter;
  order: string;
  onSort: () => void;
  fetchOnFiltersChange: (filter: Filter) => void;
}

export default function FilterSortFlights({
  filter,
  order,
  onSort,
  fetchOnFiltersChange,
}: FilterSortProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const filteredOptions = FILTER_OPTIONS.filter(
    (option) => option.key !== filter.key
  );

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setIsModalVisible(!isModalVisible)}>
          <FilterIcon />
        </TouchableOpacity>
        <Text>{filter.name}</Text>
        <TouchableOpacity
          onPress={() => {
            onSort();
          }}
        >
          <SortIcon rotate={order === "asc"} />
        </TouchableOpacity>
      </View>
      {isModalVisible && (
        <View style={styles.dropdown}>
          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  fetchOnFiltersChange(item);
                  setIsModalVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 31,
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginTop: 20,
    width: 340,
    zIndex: 10,
  },
  line: {
    backgroundColor: Colors.db,
    borderRadius: 3,
    height: 6,
    marginHorizontal: 18,
    width: 340,
  },
  dropdown: {
    alignItems: "center",
    backgroundColor: Colors.db,
    borderRadius: 6,
    height: 250,
    justifyContent: "center",
    left: 16,
    marginTop: 5,
    paddingTop: 20,
    position: "absolute",
    top: 45,
    width: 250,
    zIndex: 999,
  },
  dropdownItem: {
    alignItems: "center",
    backgroundColor: Colors.cream,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
    borderRadius: 14,
    height: 53,
    justifyContent: "center",
    marginBottom: 20,
    width: 195,
  },
  dropdownItemText: {
    color: Colors.db,
    // fontFamily: 'Goldman-Bold',
    // TODO ADD ALL THE PROPER FONTS
    fontSize: 15,
    fontWeight: "bold",
  },
});
