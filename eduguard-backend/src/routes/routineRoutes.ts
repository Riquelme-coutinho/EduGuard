import { Router } from 'express';
import { saveRoutine, getRoutine } from '../controllers/routineController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.post('/', saveRoutine);
router.get('/:studentId', getRoutine);

export default router;
