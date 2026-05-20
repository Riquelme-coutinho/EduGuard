import { Request, Response } from 'express';
import { getPendingMedications, getMedicationById, updateMedicationStatus } from '../models/medicationModel';
import { getStudentById } from '../models/studentModel';

export const getPending = (req: Request, res: Response): void => {
  try {
    const pendingMeds = getPendingMedications();
    
    const enrichedMeds = pendingMeds.map(med => {
      const student = getStudentById(med.studentId);
      return {
        ...med,
        studentName: student ? student.name : 'Aluno Desconhecido'
      };
    });

    res.status(200).json(enrichedMeds);
  } catch (error) {
    console.error('Error fetching pending medications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const administer = (req: Request, res: Response): void => {
  try {
    const { medicationId } = req.body;

    if (!medicationId) {
      res.status(400).json({ error: 'medicationId é obrigatório' });
      return;
    }

    const med = getMedicationById(medicationId);

    if (!med) {
      res.status(404).json({ error: 'Medicamento não encontrado' });
      return;
    }

    if (med.isAdministered) {
      res.status(400).json({ error: 'Medicamento já foi administrado.' });
      return;
    }

    const now = new Date();
    if (now < med.scheduledTime) {
      res.status(403).json({ 
        error: `Acesso Negado (RN-005): Este medicamento só pode ser administrado a partir das ${med.scheduledTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
      });
      return;
    }

    updateMedicationStatus(medicationId, true);
    res.status(200).json({ success: true, message: 'Medicamento administrado com sucesso' });
  } catch (error) {
    console.error('Error administering medication:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
