import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Button } from '../../components/Button';
import { useRotinaController } from '../../controllers/useRotinaController';
import { styles } from '../../styles/rotinaStyles';

export default function RotinaScreen() {
  const { students, fetchStudents, saveRoutine } = useRotinaController();
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [foodYes, setFoodYes] = useState<boolean>(true);
  const [foodObs, setFoodObs] = useState<string>('');
  const [sleepYes, setSleepYes] = useState<boolean>(true);
  const [sleepObs, setSleepObs] = useState<string>('');
  const [hygieneYes, setHygieneYes] = useState<boolean>(true);
  const [hygieneObs, setHygieneObs] = useState<string>('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async () => {
    if (!selectedStudentId) {
      Alert.alert('Seleção', 'Escolha um aluno presente.');
      return;
    }
    try {
      await saveRoutine({
        studentId: selectedStudentId,
        food: { ateWell: foodYes, obs: foodObs },
        sleep: { sleptWell: sleepYes, obs: sleepObs },
        hygiene: { clean: hygieneYes, obs: hygieneObs },
      });
      Alert.alert('Sucesso', 'Rotina salva com sucesso');
      // reset fields
      setFoodYes(true);
      setFoodObs('');
      setSleepYes(true);
      setSleepObs('');
      setHygieneYes(true);
      setHygieneObs('');
    } catch (e) {
      Alert.alert('Erro', (e as any).message || 'Falha ao salvar rotina');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Registrar Rotina Diária</Text>
        <Text style={styles.label}>Selecione um aluno presente:</Text>
        {students.map(s => (
          <View key={s.id} style={styles.studentItem}>
            <Text style={styles.studentName}>{s.name}</Text>
            <Button
              title={selectedStudentId === s.id ? 'Selecionado' : 'Selecionar'}
              onPress={() => setSelectedStudentId(s.id)}
              style={styles.selectButton}
            />
          </View>
        ))}
        <Text style={styles.section}>Alimentação</Text>
        <View style={styles.toggleRow}>
          <ToggleButton label="Sim" selected={foodYes} onPress={() => setFoodYes(true)} />
          <ToggleButton label="Não" selected={!foodYes} onPress={() => setFoodYes(false)} />
        </View>
        {!foodYes && (
          <TextInput
            placeholder="Observação"
            value={foodObs}
            onChangeText={setFoodObs}
            style={styles.input}
          />
        )}
        <Text style={styles.section}>Sono</Text>
        <View style={styles.toggleRow}>
          <ToggleButton label="Sim" selected={sleepYes} onPress={() => setSleepYes(true)} />
          <ToggleButton label="Não" selected={!sleepYes} onPress={() => setSleepYes(false)} />
        </View>
        {!sleepYes && (
          <TextInput
            placeholder="Observação"
            value={sleepObs}
            onChangeText={setSleepObs}
            style={styles.input}
          />
        )}
        <Text style={styles.section}>Higiene</Text>
        <View style={styles.toggleRow}>
          <ToggleButton label="Sim" selected={hygieneYes} onPress={() => setHygieneYes(true)} />
          <ToggleButton label="Não" selected={!hygieneYes} onPress={() => setHygieneYes(false)} />
        </View>
        {!hygieneYes && (
          <TextInput
            placeholder="Observação"
            value={hygieneObs}
            onChangeText={setHigieneObs}
            style={styles.input}
          />
        )}
        <Button title="Salvar Rotina" onPress={handleSubmit} style={styles.saveButton} />
      </ScrollView>
    </SafeAreaView>
  );
}
