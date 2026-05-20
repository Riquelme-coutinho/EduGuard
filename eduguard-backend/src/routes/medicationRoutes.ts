import { Router } from 'express';
import { getPending, administer } from '../controllers/medicationController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);

router.get('/pending', getPending);
router.post('/administer', administer);

export default router;
