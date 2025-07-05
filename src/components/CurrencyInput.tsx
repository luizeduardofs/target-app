import { StyleSheet, Text, View } from "react-native";
import Input, { CurrencyInputProps } from "react-native-currency-input";

import { colors, fontFamily } from "@/theme";

type Props = CurrencyInputProps & {
  label: string;
};

export function CurrencyInput({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },
  input: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.black,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[400],
  },
});
