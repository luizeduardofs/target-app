import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { StyleSheet, View } from "react-native";

export default function Target() {
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
        />
        <CurrencyInput label="Valor alvo (R$)" value={35789.78} />
        <Button title="Salvar" />
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
