import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_for_eduguard_mvp_1';

export const authenticateUser = async (email: string, password: string) => {
  const user = getUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, cpf: user.cpf },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      cpf: user.cpf
    }
  };
};
