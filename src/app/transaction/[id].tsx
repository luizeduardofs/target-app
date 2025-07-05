import { router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Transaction() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>ID: {params.id}</Text>
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({});
