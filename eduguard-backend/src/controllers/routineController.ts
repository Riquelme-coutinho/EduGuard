import { Request, Response } from 'express';
import { upsertRoutine } from '../models/routineModel';
import { getStudentById } from '../models/studentModel';

export const saveRoutine = (req: Request, res: Response): void => {
  try {
    const { studentId, timestamp, food, sleep, hygiene } = req.body;

    // --- Validate required fields ---
    if (!studentId || !food || !sleep || !hygiene) {
      res.status(400).json({ error: 'Dados incompletos. studentId, food, sleep e hygiene são obrigatórios.' });
      return;
    }

    // --- Validate student exists ---
    const student = getStudentById(studentId);
    if (!student) {
      res.status(404).json({ error: 'Aluno não encontrado.' });
      return;
    }

    // --- Validate timestamp is not in the future ---
    if (timestamp) {
      const ts = new Date(timestamp);
      if (ts > new Date()) {
        res.status(400).json({ error: 'Registro inválido: o timestamp não pode estar no futuro.' });
        return;
      }
    }

    // --- Enforce RN-017: observation required when answer is negative ---
    if (food.ateWell === false && (!food.obs || food.obs.trim() === '')) {
      res.status(400).json({ error: 'RN-017: Uma observação é obrigatória quando o aluno não se alimentou bem.' });
      return;
    }
    if (sleep.sleptWell === false && (!sleep.obs || sleep.obs.trim() === '')) {
      res.status(400).json({ error: 'RN-017: Uma observação é obrigatória quando o aluno não dormiu bem.' });
      return;
    }
    if (hygiene.clean === false && (!hygiene.obs || hygiene.obs.trim() === '')) {
      res.status(400).json({ error: 'RN-017: Uma observação é obrigatória quando o aluno apresentou problema de higiene.' });
      return;
    }

    // --- Upsert routine (create or overwrite today's record) ---
    const saved = upsertRoutine({
      studentId,
      date: new Date().toISOString().split('T')[0],
      food: { ateWell: food.ateWell, obs: food.obs || '' },
      sleep: { sleptWell: sleep.sleptWell, obs: sleep.obs || '' },
      hygiene: { clean: hygiene.clean, obs: hygiene.obs || '' },
    });

    res.status(200).json({ success: true, message: 'Rotina diária salva com sucesso!', routine: saved });
  } catch (error) {
    console.error('Error saving routine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getRoutine = (req: Request, res: Response): void => {
  try {
    const { studentId } = req.params;
    const routine = findRoutineForToday(studentId);
    if (!routine) {
      res.status(404).json({ error: 'Rotina não encontrada para este aluno hoje.' });
      return;
    }
    res.status(200).json({ routine });
  } catch (error) {
    console.error('Error fetching routine:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
