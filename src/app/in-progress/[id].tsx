import { useCallback, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";

import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { TransactionTypes } from "@/utils/TransactionTypes";
import dayjs from "dayjs";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

export default function InProgress() {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  const params = useLocalSearchParams<{ id: string }>();

  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionsDatabase();

  async function fetchTargetDetails() {
    try {
      const response = await targetDatabase.show(Number(params.id));
      setDetails({
        name: response?.name!,
        current: numberToCurrency(response?.current!),
        target: numberToCurrency(response?.amount!),
        percentage: response?.percentage!,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível pegar os detalhes da meta");
      console.error(error);
    }
  }

  async function fetchTransactions() {
    try {
      const response = await transactionsDatabase.listByTargetId(
        Number(params.id)
      );
      setTransactions(
        response.map((item) => ({
          id: String(item.id),
          value: numberToCurrency(item.amount),
          date: dayjs(item.created_at).format("DD/MM/YYYY [às] HH:mm"),
          description: item.observation,
          type:
            item.amount < 0 ? TransactionTypes.Output : TransactionTypes.Input,
        }))
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as transações");
      console.error(error);
    }
  }

  async function handleTransactionRemove(id: string) {
    Alert.alert("Remover", "Deseja realmente remover?", [
      { text: "Não", style: "destructive" },
      { text: "Sim", onPress: () => transactionRemove(id) },
    ]);
  }

  async function transactionRemove(id: string) {
    try {
      await transactionsDatabase.remove(Number(id));
      fetchData();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível remover a transação");
      console.error(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchTargetDetails();
    const fetchTransitionsPromise = fetchTransactions();

    await Promise.all([fetchDetailsPromise, fetchTransitionsPromise]);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) return <Loading />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <PageHeader
        title={details.name}
        rightButton={{
          icon: "edit",
          onPress: () => router.navigate(`/target?id=${params.id}`),
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction
            data={item}
            onRemove={() => handleTransactionRemove(item.id)}
          />
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
