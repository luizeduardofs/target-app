import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response?.name!);
      setAmount(response?.amount!);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível pegar os detalhes da meta");
      console.error(error);
    }
  }

  async function create() {
    try {
      await targetDatabase.create({ name, amount });
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta");
      console.error(error);
      setIsProcessing(false);
    }
  }

  async function update() {
    try {
      await targetDatabase.update({
        id: Number(params.id),
        name,
        amount,
      });
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta");
      console.error(error);
      setIsProcessing(false);
    }
  }

  async function remove() {
    try {
      await targetDatabase.remove(Number(params.id));
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a meta");
      console.error(error);
    }
  }

  function handleRemove() {
    if (!params.id) return;

    Alert.alert("Remover", "Deseja realmente remover?", [
      { text: "Não", style: "destructive" },
      { text: "Sim", onPress: remove },
    ]);
  }

  function handleSave() {
    if (!name.trim() || amount <= 0)
      return Alert.alert("Atenção", "Preencha nome e valor");

    setIsProcessing(true);

    if (params.id) {
      update();
    } else {
      create();
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira"
        rightButton={
          params.id ? { icon: "delete", onPress: handleRemove } : undefined
        }
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Valor alvo (R$)"
          value={amount}
          onChangeValue={(e) => setAmount(e || 0)}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
