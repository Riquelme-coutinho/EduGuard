import { API_BASE_URL } from '../constants/theme';

export interface PendingMedication {
  id: string;
  studentId: string;
  studentName: string;
  medicineName: string;
  dosage: string;
  scheduledTime: string;
  isAdministered: boolean;
}

export const medicationService = {
  getPending: async (token: string): Promise<PendingMedication[]> => {
    const response = await fetch(`${API_BASE_URL}/medications/pending`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Erro ao buscar medicamentos');
    return response.json();
  },

  administer: async (token: string, medicationId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/medications/administer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ medicationId })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Erro ao administrar medicamento');
    }
  }
};
