import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { studentService, Student } from '../models/studentService';

const MOCK_TOKEN = 'mock-jwt-token';

export const useEntradaController = () => {
  const [absentStudents, setAbsentStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAbsentStudents();
  }, []);

  const fetchAbsentStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getStudents(MOCK_TOKEN);
      setAbsentStudents(data.filter(s => !s.isPresent));
    } catch (err: any) {
      setError('Falha ao carregar alunos ausentes.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async (studentId: string, studentName: string) => {
    setLoading(true);
    setError(null);

    try {
      await studentService.checkinStudent(MOCK_TOKEN, studentId);
      Alert.alert('Sucesso', `${studentName} registrado(a) com sucesso!`);
      // Update local state
      setAbsentStudents(prev => prev.filter(s => s.id !== studentId));
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar entrada.');
      Alert.alert('Erro', err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    absentStudents,
    loading,
    error,
    handleCheckin,
  };
};
