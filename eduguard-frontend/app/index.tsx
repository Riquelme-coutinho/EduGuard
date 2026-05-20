import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useIndexController } from '../controllers/useIndexController';
import { styles } from '../styles/indexStyles';

export default function IndexScreen() {
  const { handleSelectResponsavel, handleSelectEscola } = useIndexController();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>EduGuard</Text>
        <Text style={styles.subtitle}>Segurança e transparência na educação infantil</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity 
          style={[styles.optionButton, styles.optionButtonPrimary]} 
          onPress={handleSelectResponsavel}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>Sou Responsável</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, styles.optionButtonSecondary]} 
          onPress={handleSelectEscola}
          activeOpacity={0.8}
        >
          <Text style={styles.optionText}>Sou da Escola</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
