import { StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";

const details = {
  current: "R$ 580,00",
  target: "R$ 1700,00",
  percentage: 25,
};

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 300,00",
    date: "25/07/25",
    description: "CDB de 110% no banco Nu",
    type: TransactionTypes.Input,
  },
  {
    id: "1",
    value: "R$ 20,00",
    date: "25/07/25",
    type: TransactionTypes.Output,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Click em nova transação para guardar seu primeiro dinheiro aqui"
      />

      <Button
        title="Nova transação"
        onPress={() => router.navigate(`/transaction/${params.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 23,
    gap: 32,
  },
});
