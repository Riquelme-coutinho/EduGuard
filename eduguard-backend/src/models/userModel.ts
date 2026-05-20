import bcrypt from 'bcrypt';

export type Role = 'MANAGER' | 'TEACHER' | 'PARENT';

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  cpf: string;
}

// Pre-hashed password '123456' for testing
const mockHash = bcrypt.hashSync('123456', 10);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Gestor Teste',
    email: 'gestor@escola.com',
    passwordHash: mockHash,
    role: 'MANAGER',
    cpf: '111.111.111-11'
  },
  {
    id: '2',
    name: 'Professora Ana',
    email: 'ana@escola.com',
    passwordHash: mockHash,
    role: 'TEACHER',
    cpf: '222.222.222-22'
  },
  {
    id: '3',
    name: 'Responsável Carlos',
    email: 'carlos@email.com',
    passwordHash: mockHash,
    role: 'PARENT',
    cpf: '333.333.333-33'
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(u => u.email === email);
};
