import { colors, fontFamily } from "@/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { ColorValue, StyleSheet, Text, View } from "react-native";

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};

export function Summary({ data, icon, isLeft = false }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons name={icon.name} color={icon.color} size={16} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  label: {
    fontSize: 10,
    color: colors.blue[300],
    fontFamily: fontFamily.regular,
  },
  value: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
});
