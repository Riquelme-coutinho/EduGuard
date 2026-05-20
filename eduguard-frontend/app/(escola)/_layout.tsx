import { Stack } from 'expo-router';
import { theme } from '../../constants/theme';

export default function EscolaLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: theme.fonts.weight.bold,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        }
      }}
    >
      <Stack.Screen name="dashboard" options={{ title: 'Painel da Escola', headerLeft: () => null }} />
      <Stack.Screen name="saida" options={{ title: 'Registrar Saída' }} />
    </Stack>
  );
}
