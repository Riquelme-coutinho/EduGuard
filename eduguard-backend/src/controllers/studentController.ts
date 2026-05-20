import { Request, Response } from 'express';
import { getAllStudents, getStudentById, updateStudentPresence } from '../models/studentModel';

export const getStudents = (req: Request, res: Response): void => {
  try {
    const students = getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const validateCheckout = (req: Request, res: Response): void => {
  try {
    const { studentId, parentCpf } = req.body;

    if (!studentId || !parentCpf) {
      res.status(400).json({ error: 'studentId e parentCpf são obrigatórios' });
      return;
    }

    const student = getStudentById(studentId);

    if (!student) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }

    // Apenas limpa a pontuação do CPF para garantir correspondência (ex: 111.111.111-11 -> 11111111111) se necessário
    // Por enquanto, testaremos exatamente igual ao mock.
    if (student.parentCpf !== parentCpf) {
      res.status(403).json({ error: 'Acesso Negado: O CPF informado não está vinculado a este aluno.' });
      return;
    }

    // CPF valid and linked. Return adult info and photo for visual validation (RN-003 step 2)
    res.status(200).json({ 
      valid: true, 
      parentName: student.parentName,
      photoUrl: student.photoUrl,
      message: 'CPF validado com sucesso. Por favor, faça a validação visual da foto.'
    });

  } catch (error) {
    console.error('Error during checkout validation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const confirmCheckout = (req: Request, res: Response): void => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      res.status(400).json({ error: 'studentId é obrigatório' });
      return;
    }

    const success = updateStudentPresence(studentId, false);

    if (success) {
      res.status(200).json({ success: true, message: 'Saída registrada com sucesso' });
    } else {
      res.status(404).json({ error: 'Aluno não encontrado' });
    }
  } catch (error) {
    console.error('Error confirming checkout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const checkin = (req: Request, res: Response): void => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      res.status(400).json({ error: 'studentId é obrigatório' });
      return;
    }

    const student = getStudentById(studentId);

    if (!student) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }

    if (student.isPresent) {
      res.status(400).json({ error: 'Falha: O aluno já está registrado como presente hoje (RN-008).' });
      return;
    }

    updateStudentPresence(studentId, true);
    res.status(200).json({ success: true, message: 'Entrada registrada com sucesso' });
  } catch (error) {
    console.error('Error during check-in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
