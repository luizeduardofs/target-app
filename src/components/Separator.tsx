import { ColorValue, StyleSheet, View } from "react-native";

export function Separator({ color }: { color: ColorValue }) {
  return <View style={[styles.container, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1,
  },
});
