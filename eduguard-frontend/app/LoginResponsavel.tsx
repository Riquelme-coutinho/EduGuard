import React from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLoginResponsavelController } from '../controllers/useLoginResponsavelController';
import { styles } from '../styles/loginStyles'; 
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export default function LoginResponsavelScreen() {
  const {
    cpf,
    setCpf,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  } = useLoginResponsavelController();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Área do Responsável</Text>
            <Text style={styles.subtitle}>Faça login com seu CPF e senha</Text>
          </View>

          <View style={styles.form}>
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Input
              label="CPF"
              placeholder="Digite seu CPF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="number-pad"
            />

            <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <View style={styles.buttonContainer}>
              <Button 
                title="Entrar" 
                onPress={handleLogin} 
                loading={loading}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
