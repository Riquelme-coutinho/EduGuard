import { useState } from 'react';
import { useRouter } from 'expo-router';

export const useLoginResponsavelController = () => {
  const router = useRouter();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!cpf || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      alert('Login efetuado. O dashboard do responsável será feito em breve.');
    }, 1000);
  };

  return {
    cpf,
    setCpf,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
