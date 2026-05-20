import { API_BASE_URL } from '../constants/theme';

export interface Student {
  id: string;
  name: string;
  isPresent: boolean;
}

export interface ValidationResult {
  valid: boolean;
  parentName: string;
  photoUrl: string;
  message: string;
}

export const studentService = {
  getStudents: async (token: string): Promise<Student[]> => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar alunos');
    return response.json();
  },

  checkinStudent: async (token: string, studentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/students/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ studentId })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao fazer check-in');
    }
  },

  validateCheckout: async (token: string, studentId: string, parentCpf: string): Promise<ValidationResult> => {
    const response = await fetch(`${API_BASE_URL}/students/checkout/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ studentId, parentCpf })
    });
    
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro na validação');
    }
    return response.json();
  },

  confirmCheckout: async (token: string, studentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/students/checkout/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ studentId })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao confirmar saída');
    }
  }
};
