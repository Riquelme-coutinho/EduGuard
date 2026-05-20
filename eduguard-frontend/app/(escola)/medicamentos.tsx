import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useMedicamentosController } from '../../controllers/useMedicamentosController';
import { styles } from '../../styles/medicamentosStyles';
import { theme } from '../../constants/theme';
import { Button } from '../../components/Button';

export default function MedicamentosScreen() {
  const { medications, loading, error, handleAdminister } = useMedicamentosController();

  const formatTime = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Medicamentos Pendentes</Text>
        <Text style={styles.subtitle}>Lista de medicamentos que precisam ser administrados hoje (RN-005).</Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {loading && medications.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : medications.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum medicamento pendente para hoje.</Text>
        ) : (
          medications.map(med => (
            <View key={med.id} style={styles.medItem}>
              <View style={styles.medHeader}>
                <Text style={styles.studentName}>{med.studentName}</Text>
                <Text style={styles.timeText}>{formatTime(med.scheduledTime)}</Text>
              </View>
              <Text style={styles.medDetails}>
                Remédio: {med.medicineName}{'\n'}
                Dose: {med.dosage}
              </Text>

              <Button 
                title="Confirmar Administração" 
                onPress={() => handleAdminister(med.id, med.medicineName, med.studentName)} 
                disabled={loading}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
