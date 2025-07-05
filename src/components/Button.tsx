import { colors, fontFamily } from "@/theme";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
};

export function Button({ title, isProcessing = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={styles.title}>
        {isProcessing ? (
          <ActivityIndicator size={"small"} color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue[500],
    width: "100%",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
});
