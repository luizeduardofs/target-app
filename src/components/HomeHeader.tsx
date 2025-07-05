import { colors, fontFamily } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Separator } from "./Separator";
import { Summary, SummaryProps } from "./Summary";

export type HomeHeaderProps = {
  total: string;
  input: SummaryProps;
  output: SummaryProps;
};

type Props = {
  data: HomeHeaderProps;
};

export function HomeHeader({ data }: Props) {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]]}
      style={styles.container}
    >
      <View>
        <Text style={styles.label}>Total que você possui</Text>
        <Text style={styles.total}>{data.total}</Text>
      </View>
      <Separator color={colors.blue[400]} />
      <View style={styles.summary}>
        <Summary
          data={data.input}
          icon={{ name: "arrow-upward", color: colors.green[500] }}
        />
        <Summary
          data={data.output}
          icon={{ name: "arrow-downward", color: colors.red[400] }}
          isLeft={true}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 324,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    paddingBottom: 18,
    gap: 24,
  },
  label: {
    fontSize: 12,
    color: colors.white,
    fontFamily: fontFamily.regular,
  },
  total: {
    fontSize: 32,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  summary: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
