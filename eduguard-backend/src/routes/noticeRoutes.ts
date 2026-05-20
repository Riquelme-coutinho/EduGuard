import { Router } from 'express';
import { listNotices, addNotice } from '../controllers/noticeController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.get('/', listNotices);
router.post('/', addNotice);

export default router;
