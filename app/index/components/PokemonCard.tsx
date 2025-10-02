import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PokemonCard: React.FC<{ item: any; onPress: () => void }> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.itemRow} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.image}
          testID="pokemon-card-image"
        />
      </View>
      <Text style={styles.nameText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default memo(PokemonCard);

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageContainer: { flex: 0.5 },
  image: { width: 40, height: 40 },
  nameText: { marginLeft: 12, fontSize: 18, color: "black", flex: 1.5 },
});
