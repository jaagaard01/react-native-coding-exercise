import { Button, RootHeader } from "../../../components";
import { Filter, Flight } from "../../../types/types";
import { StyleSheet, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";

import { Banner } from "../../../assets/vector";
import { Colors } from "../../../constants/Colors";
import { FILTER_OPTIONS } from "../../../constants/Constants";
import FilterSortFlights from "./FilterSortFlights";
import FlightList from "./FlightList";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../../components/SearchInput";
import { router } from "expo-router";
import { useState } from "react";

const GET_LAUNCHES = gql`
  query GetLaunches(
    $sort: String
    $order: String
    $offset: Int
    $limit: Int
    $find: LaunchFind
  ) {
    launchesPast(
      sort: $sort
      order: $order
      offset: $offset
      limit: $limit
      find: $find
    ) {
      id
      rocket {
        rocket_type
        rocket_name
      }
      mission_name
      launch_year
    }
  }
`;
export default function Root() {
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState(FILTER_OPTIONS[3]);
  const [order, setOrder] = useState("asc");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_LAUNCHES, {
    variables: {
      find: { mission_name: null },
      limit: 10,
      offset: 0,
      order,
      sort: filter.key,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const onSort = async () => {
    setHasMore(true);
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    await refetch({
      find: { mission_name: searchValue || null },
      limit: 10,
      offset: 0,
      order,
      sort: filter.key,
    });
  };

  console.log(data?.launchesPast.length);

  const searchForFlights = () => {
    setHasMore(true);
    refetch({
      find: { mission_name: searchValue || null },
      limit: 10,
      offset: 0,
      order,
      sort: filter.key,
    });
  };

  const fetchOnFiltersChange = (item: Filter) => {
    setHasMore(true);
    setFilter(item);
    refetch({
      find: { mission_name: searchValue || null },
      limit: 10,
      offset: 0,
      order,
      sort: item.key,
    });
  };

  const fetchMoreOnPress = () => {
    if (!hasMore) return;
    fetchMore({
      variables: {
        find: { mission_name: searchValue || null },
        limit: 10,
        offset: data?.launchesPast.length,
        order,
        sort: filter.key,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.launchesPast.length < 10) {
          setHasMore(false);
          return prev;
        }
        return {
          launchesPast: [...prev.launchesPast, ...fetchMoreResult.launchesPast],
        };
      },
    });
  };

  const onDetailScreenPress = () => router.push("/App/Ticket");

  if (error) return <View>ERROR OCCURRED</View>;

  return (
    <SafeAreaView style={styles.parent}>
      <RootHeader />
      <View style={styles.bottomContainer}>
        <Banner style={styles.banner} />
        <SearchInput
          label="Search for flights"
          onChange={setSearchValue}
          onPress={searchForFlights}
          value={searchValue}
        />
        <View style={styles.zIndex}>
          <FilterSortFlights
            fetchOnFiltersChange={fetchOnFiltersChange}
            filter={filter}
            onSort={onSort}
            order={order}
          />
        </View>
        {data?.launchesPast && (
          <>
            <FlightList
              data={data.launchesPast}
              filter={filter}
              onDetailScreenPress={onDetailScreenPress}
              selectedFlight={selectedFlight}
              setSelectedFlight={setSelectedFlight}
            />
            <View style={styles.loadMoreContainer}>
              <Text style={styles.font}>
                {data?.launchesPast.length} of 180
              </Text>
              <Button
                disabled={!hasMore || loading}
                onPress={fetchMoreOnPress}
                style={styles.btn}
                text={loading ? "LOADING.." : "LOAD MORE"}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.beige,
    flex: 1,
  },

  bottomContainer: {
    backgroundColor: Colors.beige,
    flex: 1,
  },
  banner: {
    marginBottom: 26,
    marginHorizontal: 57,
    marginTop: 20,
  },
  zIndex: {
    zIndex: 10,
  },
  loadMoreContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 79,
    marginRight: 66,
    marginTop: 15,
  },
  btn: {
    backgroundColor: Colors.orange,
    borderRadius: 16.5,
    fontSize: 12,
    height: 33,
    width: 141,
  },
  font: {
    color: Colors.db,
    fontSize: 15,
    fontWeight: "bold",
  },
});
