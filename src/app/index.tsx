import { StatusBar, StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import { Target } from "@/components/Target";
import { router } from "expo-router";

const summary = {
  total: "R$ 2.657,00",
  input: { label: "Entradas", value: "R$ 6.187,94" },
  output: { label: "Saídas", value: "-R$ 2.715,40" },
};

const targets = [
  {
    id: "1",
    name: "Cadeira ergonômica",
    percentage: "50%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: "2",
    name: "Cadeira ergonômica",
    percentage: "50%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: "3",
    name: "Cadeira ergonômica",
    percentage: "50%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
];

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <HomeHeader data={summary} />
      <List
        title="Metas"
        keyExtractor={(item) => item.id}
        data={targets}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta. Click em nova meta para adicionar"
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.navigate("/target")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
