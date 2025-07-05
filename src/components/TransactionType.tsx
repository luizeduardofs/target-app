import { MaterialIcons } from "@expo/vector-icons";
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors, fontFamily } from "@/theme";
import { TransactionTypes } from "@/utils/TransactionTypes";

type Props = {
  selected: TransactionTypes;
  onChange: (type: TransactionTypes) => void;
};

export function TransactionType({ selected, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Option
        title="Guardar"
        icon="arrow-upward"
        isSelected={selected === TransactionTypes.Input}
        selectedColor={colors.blue[500]}
        onPress={() => onChange(TransactionTypes.Input)}
      />
      <Option
        title="Resgatar"
        icon="arrow-downward"
        isSelected={selected === TransactionTypes.Output}
        selectedColor={colors.red[400]}
        onPress={() => onChange(TransactionTypes.Output)}
      />
    </View>
  );
}

type OptionProps = PressableProps & {
  isSelected: boolean;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  selectedColor: ColorValue;
};

export function Option({
  isSelected,
  title,
  icon,
  selectedColor,
  ...rest
}: OptionProps) {
  return (
    <Pressable
      style={[styles.option, isSelected && { backgroundColor: selectedColor }]}
      {...rest}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={isSelected ? colors.white : colors.gray[500]}
      />
      <Text style={[styles.title, isSelected && { color: colors.white }]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    overflow: "hidden",
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
    gap: 7,
  },
  title: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.gray[500],
  },
});
