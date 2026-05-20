import { useRouter } from 'expo-router';

export const useDashboardController = () => {
  const router = useRouter();

  const handleNavigateRotina = () => {
    router.push('/(escola)/rotina');
  };

  const handleNavigateCheckout = () => {
    router.push('/(escola)/saida');
  };

  const handleNavigateMedicamentos = () => {
    router.push('/(escola)/medicamentos');
  };

  return {
    handleNavigateEntrada,
    handleNavigateCheckout,
    handleNavigateMedicamentos,
  };
};
