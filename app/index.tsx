import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PokemonCard from "./index/components/PokemonCard";
import useIndex from "./index/useIndex";

const HomeScreen = () => {
  const router = useRouter();
  const { pokemons, isLoading, isError } = useIndex();

  const renderItem = useMemo(() => {
    function renderPokemonItem({ item }: { item: any }) {
      return (
        <PokemonCard
          item={item}
          onPress={() => router.push(`/pokemon/${item.id}`)}
        />
      );
    }

    return renderPokemonItem;
  }, [router]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" testID="activity-indicator" />
        <Text>Loading Pokemon...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching Pokemon</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={pokemons}
      style={styles.list}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      initialNumToRender={(pokemons || []).length}
      testID="pokemon-list"
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  list: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 16,
  },
});
