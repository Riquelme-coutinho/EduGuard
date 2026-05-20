import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useDashboardController } from '../../controllers/useDashboardController';
import { styles } from '../../styles/dashboardStyles';
import { Button } from '../../components/Button';

export default function DashboardScreen() {
  const { handleNavigateEntrada, handleNavigateCheckout, handleNavigateMedicamentos } = useDashboardController();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>Olá, Escola</Text>
          <Text style={styles.subtitle}>O que você deseja fazer hoje?</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Registrar Entrada</Text>
            <Text style={styles.cardDesc}>Dê check-in nos alunos que acabaram de chegar.</Text>
            <Button 
              title="Registrar Entrada" 
              onPress={handleNavigateEntrada}
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Controle de Saída</Text>
            <Text style={styles.cardDesc}>Registre a saída de alunos com validação visual de segurança.</Text>
            <Button 
              title="Registrar Saída" 
              onPress={handleNavigateCheckout}
              style={styles.cardButton}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Registrar Rotina Diária</Text>
            <Text style={styles.cardDesc}>Registre a alimentação, sono e higiene dos alunos presentes.</Text>
            <Button 
              title="Registrar Rotina" 
              onPress={handleNavigateRotina}
              style={styles.cardButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
