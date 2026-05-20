export interface Student {
  id: string;
  name: string;
  parentCpf: string;
  parentName: string;
  photoUrl: string; // Mock photo URL of the parent for visual validation
  isPresent: boolean;
}

const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Joãozinho Silva',
    parentCpf: '111.111.111-11',
    parentName: 'Carlos Silva',
    photoUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    isPresent: true,
  },
  {
    id: 's2',
    name: 'Maria Eduarda',
    parentCpf: '222.222.222-22',
    parentName: 'Ana Souza',
    photoUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    isPresent: true,
  },
  {
    id: 's3',
    name: 'Pedro Alves',
    parentCpf: '333.333.333-33',
    parentName: 'Responsável Carlos',
    photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    isPresent: false,
  }
];

export const getAllStudents = (): Student[] => {
  return mockStudents;
};

export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find(s => s.id === id);
};

export const updateStudentPresence = (id: string, isPresent: boolean): boolean => {
  const student = mockStudents.find(s => s.id === id);
  if (student) {
    student.isPresent = isPresent;
    return true;
  }
  return false;
};
