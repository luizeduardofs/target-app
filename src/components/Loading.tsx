import { colors } from "@/theme/colors";
import { ActivityIndicator, StyleSheet } from "react-native";

export function Loading() {
  return (
    <ActivityIndicator color={colors.blue[500]} style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
