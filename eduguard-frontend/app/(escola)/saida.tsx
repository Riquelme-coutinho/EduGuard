import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useSaidaController } from '../../controllers/useSaidaController';
import { styles } from '../../styles/saidaStyles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { theme } from '../../constants/theme';

export default function SaidaScreen() {
  const {
    step,
    students,
    selectedStudentId,
    setSelectedStudentId,
    parentCpf,
    setParentCpf,
    validationData,
    loading,
    error,
    handleValidate,
    handleConfirm,
    handleCancel
  } = useSaidaController();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {step === 1 && (
          <View>
            <Text style={styles.stepTitle}>Passo 1: Identificação</Text>
            <Text style={styles.subtitle}>Selecione o aluno e informe o CPF do responsável.</Text>

            <Text style={styles.sectionTitle}>Selecione o Aluno (Presentes):</Text>
            {students.length === 0 && !loading && (
              <Text>Nenhum aluno presente no momento.</Text>
            )}
            
            {loading && students.length === 0 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            ) : (
              <ScrollView style={styles.studentList} nestedScrollEnabled>
                {students.map(student => (
                  <TouchableOpacity
                    key={student.id}
                    style={[
                      styles.studentItem,
                      selectedStudentId === student.id && styles.studentItemActive
                    ]}
                    onPress={() => setSelectedStudentId(student.id)}
                  >
                    <Text style={[
                      styles.studentName,
                      selectedStudentId === student.id && styles.studentNameActive
                    ]}>
                      {student.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Input
              label="CPF do Adulto (Retirante)"
              placeholder="Ex: 111.111.111-11"
              value={parentCpf}
              onChangeText={setParentCpf}
              keyboardType="number-pad"
            />

            <Button 
              title="Buscar / Validar" 
              onPress={handleValidate} 
              loading={loading}
              disabled={loading || !selectedStudentId || !parentCpf}
            />
          </View>
        )}

        {step === 2 && validationData && (
          <View>
            <Text style={styles.stepTitle}>Passo 2: Validação Visual</Text>
            <Text style={styles.subtitle}>Confirme visualmente se o adulto corresponde à foto abaixo (RN-003).</Text>

            <View style={styles.validationCard}>
              {validationData.photoUrl ? (
                <Image source={{ uri: validationData.photoUrl }} style={styles.photoMock} />
              ) : (
                <View style={styles.photoMock} />
              )}
              <Text style={styles.parentName}>{validationData.parentName}</Text>
              <Text style={styles.validationMsg}>{validationData.message}</Text>
            </View>

            <View style={styles.buttonGroup}>
              <Button 
                title="Confirmar Saída" 
                onPress={handleConfirm} 
                loading={loading}
                disabled={loading}
              />
              <Button 
                title="Cancelar / Voltar" 
                variant="secondary"
                onPress={handleCancel} 
                disabled={loading}
              />
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
