import React from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useEntradaController } from '../../controllers/useEntradaController';
import { styles } from '../../styles/entradaStyles';
import { theme } from '../../constants/theme';
import { Button } from '../../components/Button';

export default function EntradaScreen() {
  const { absentStudents, loading, error, handleCheckin } = useEntradaController();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Registrar Entrada</Text>
        <Text style={styles.subtitle}>Alunos que ainda não chegaram hoje:</Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {loading && absentStudents.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={theme.colors.primary} />
          </View>
        ) : absentStudents.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Todos os alunos já estão presentes!</Text>
        ) : (
          absentStudents.map(student => (
            <View key={student.id} style={styles.studentItem}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Button 
                title="Dar Entrada" 
                onPress={() => handleCheckin(student.id, student.name)} 
                disabled={loading}
                style={{ width: 'auto', paddingHorizontal: 15, paddingVertical: 8 }}
              />
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
