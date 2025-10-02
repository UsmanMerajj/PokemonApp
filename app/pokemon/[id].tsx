import { capitalize } from "@/utils/string";
import { Stack } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import usePokemon from "./usePokemon";

export default function PokemonDetail() {
  const { pokemon, isLoading, isError } = usePokemon();

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={styles.full}
        testID="activity-indicator"
      />
    );
  if (isError) return <Text style={styles.full}>Failed to load</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: capitalize(pokemon.name) }} />

      <Image
        source={{ uri: pokemon.sprites.front_default }}
        style={styles.image}
        testID="pokemon-image"
      />

      <View style={styles.row}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{pokemon.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Height</Text>
        <Text style={styles.value}>{pokemon.height}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Weight</Text>
        <Text style={styles.value}>{pokemon.weight}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Types</Text>
        <View>
          {pokemon.types.map((t: any) => (
            <Text key={t.type.name} style={styles.value}>
              {t.type.name}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1 },
  container: { flex: 1, paddingVertical: 10, backgroundColor: "white" },
  image: { width: 150, height: 150, alignSelf: "center" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
  },
  label: {
    fontWeight: "800",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    textAlign: "right",
  },
});
