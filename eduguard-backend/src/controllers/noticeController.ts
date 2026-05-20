import { Request, Response } from 'express';
import { getAllNotices, createNotice } from '../models/noticeModel';

export const listNotices = (req: Request, res: Response): void => {
  try {
    const notices = getAllNotices();
    res.status(200).json({ notices });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addNotice = (req: Request, res: Response): void => {
  try {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
      res.status(400).json({ error: 'Campos obrigatórios ausentes' });
      return;
    }
    const notice = createNotice({ title, content, authorId });
    res.status(201).json({ notice });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
