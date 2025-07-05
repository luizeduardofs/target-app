import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { colors, fontFamily } from "@/theme";

type Props = TextInputProps & {
  label: string;
};

export function Input({ label, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
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
    color: colors.gray[600],
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
