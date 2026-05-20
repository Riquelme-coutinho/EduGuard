import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { studentService, Student, ValidationResult } from '../models/studentService';
import { useRouter } from 'expo-router';

// In a real app, this token would come from context/SecureStore
const MOCK_TOKEN = 'mock-jwt-token'; 

export const useSaidaController = () => {
  const router = useRouter();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [parentCpf, setParentCpf] = useState('');
  
  const [step, setStep] = useState<1 | 2>(1);
  const [validationData, setValidationData] = useState<ValidationResult | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentService.getStudents(MOCK_TOKEN);
      setStudents(data.filter(s => s.isPresent)); // Only show present students
    } catch (err: any) {
      setError('Falha ao carregar lista de alunos.');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async () => {
    if (!selectedStudentId || !parentCpf) {
      setError('Selecione um aluno e informe o CPF.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await studentService.validateCheckout(MOCK_TOKEN, selectedStudentId, parentCpf);
      setValidationData(result);
      setStep(2); // Move to Step 2
    } catch (err: any) {
      setError(err.message || 'Erro na validação do CPF.');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedStudentId) return;

    setLoading(true);
    setError(null);

    try {
      await studentService.confirmCheckout(MOCK_TOKEN, selectedStudentId);
      Alert.alert('Sucesso', 'Saída registrada com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (err: any) {
      setError(err.message || 'Erro ao confirmar saída.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setStep(1);
    setValidationData(null);
    setParentCpf('');
  };

  return {
    step,
    students,
    selectedStudentId,
    setSelectedStudentId,
    parentCpf,
    setParentCpf,
    validationData,
    loading,
    error,
    handleValidate,
    handleConfirm,
    handleCancel
  };
};
