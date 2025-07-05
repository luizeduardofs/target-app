import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fontFamily } from "@/theme";
import { TransactionTypes } from "@/utils/TransactionTypes";

export type TransactionProps = {
  id: string;
  value: string;
  date: string;
  description?: string;
  type: TransactionTypes;
};

type Props = {
  data: TransactionProps;
  onRemove: () => void;
};

export function Transaction({ data, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <MaterialIcons
        size={20}
        name={
          data.type === TransactionTypes.Input
            ? "arrow-upward"
            : "arrow-downward"
        }
        color={
          data.type === TransactionTypes.Input
            ? colors.blue[500]
            : colors.red[400]
        }
      />
      <View style={styles.info}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {data.date} {data.description && `• ${data.description}`}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  info: {
    flex: 1,
    gap: 7,
  },
  value: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
  description: {
    fontSize: 12,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
});
