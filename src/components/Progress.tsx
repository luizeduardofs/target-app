import { colors, fontFamily } from "@/theme";
import { StyleSheet, Text, View } from "react-native";

type SavedValue = {
  current: string;
  target: string;
  percentage: number;
};

type Props = {
  data: SavedValue;
};

export function Progress({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor guardado</Text>
      <View style={styles.status}>
        <Text style={styles.value}>
          {data.current}
          <Text style={styles.target}> de {data.target}</Text>
        </Text>
        <Text style={styles.percentage}>{data.percentage.toFixed(0)}%</Text>
      </View>
      <View style={styles.progress}>
        <View
          style={[styles.currentProgress, { width: `${data.percentage}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
    marginBottom: 5,
  },
  status: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  value: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: colors.black,
    flex: 1,
  },
  target: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },
  percentage: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.blue[500],
  },
  progress: {
    marginTop: 16,
    width: "100%",
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.gray[300],
    overflow: "hidden",
  },
  currentProgress: {
    height: 5,
    backgroundColor: colors.blue[500],
  },
});
