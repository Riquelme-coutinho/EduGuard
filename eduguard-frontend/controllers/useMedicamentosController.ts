import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { medicationService, PendingMedication } from '../models/medicationService';

const MOCK_TOKEN = 'mock-jwt-token';

export const useMedicamentosController = () => {
  const [medications, setMedications] = useState<PendingMedication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    setLoading(true);
    try {
      const data = await medicationService.getPending(MOCK_TOKEN);
      const sorted = data.sort((a, b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime());
      setMedications(sorted);
    } catch (err: any) {
      setError('Falha ao carregar medicamentos pendentes.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminister = async (medicationId: string, medicineName: string, studentName: string) => {
    setLoading(true);
    setError(null);

    try {
      await medicationService.administer(MOCK_TOKEN, medicationId);
      Alert.alert('Sucesso', `${medicineName} administrado para ${studentName}.`);
      setMedications(prev => prev.filter(m => m.id !== medicationId));
    } catch (err: any) {
      setError(err.message || 'Erro ao administrar medicamento.');
      Alert.alert('Atenção', err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    medications,
    loading,
    error,
    handleAdminister,
  };
};
