import { useState } from 'react';
import { useRouter } from 'expo-router';
import { authService } from '../models/authService';

export const useLoginController = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(email, password);
      router.replace('/(escola)/dashboard');
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
