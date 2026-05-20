import { Stack } from 'expo-router';
import { theme } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: theme.fonts.weight.bold,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="LoginEscola" options={{ title: 'Acesso Restrito' }} />
      <Stack.Screen name="LoginResponsavel" options={{ title: 'Acesso Responsável' }} />
      <Stack.Screen name="(escola)" options={{ headerShown: false }} />
    </Stack>
  );
}
