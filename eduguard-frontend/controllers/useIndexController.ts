import { useRouter } from 'expo-router';

export const useIndexController = () => {
  const router = useRouter();

  const handleSelectResponsavel = () => {
    router.push('/LoginResponsavel');
  };

  const handleSelectEscola = () => {
    router.push('/LoginEscola');
  };

  return {
    handleSelectResponsavel,
    handleSelectEscola,
  };
};
