export interface Medication {
  id: string;
  studentId: string;
  medicineName: string;
  dosage: string;
  scheduledTime: Date;
  isAdministered: boolean;
}

const now = new Date();
const pastTime = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
const futureTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours in future

const mockMedications: Medication[] = [
  {
    id: 'm1',
    studentId: 's1', // Joãozinho Silva
    medicineName: 'Dipirona',
    dosage: '10 gotas',
    scheduledTime: pastTime,
    isAdministered: false,
  },
  {
    id: 'm2',
    studentId: 's2', // Maria Eduarda
    medicineName: 'Amoxicilina',
    dosage: '5 ml',
    scheduledTime: futureTime,
    isAdministered: false,
  }
];

export const getPendingMedications = (): Medication[] => {
  return mockMedications.filter(m => !m.isAdministered);
};

export const getMedicationById = (id: string): Medication | undefined => {
  return mockMedications.find(m => m.id === id);
};

export const updateMedicationStatus = (id: string, status: boolean): boolean => {
  const med = getMedicationById(id);
  if (med) {
    med.isAdministered = status;
    return true;
  }
  return false;
};
