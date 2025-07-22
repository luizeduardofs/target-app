import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

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

  function handleSave() {
    if (!name.trim() || amount <= 0)
      return Alert.alert("Atenção", "Preencha nome e valor");

    setIsProcessing(true);

    if (params.id) {
      // update
    } else {
      create();
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira"
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
