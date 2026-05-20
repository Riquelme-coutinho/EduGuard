import { Request, Response } from 'express';
import { authenticateUser } from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const authData = await authenticateUser(email, password);

    if (!authData) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    res.status(200).json(authData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
