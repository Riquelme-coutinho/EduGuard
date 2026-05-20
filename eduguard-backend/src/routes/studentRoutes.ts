import { Router } from 'express';
import { getStudents, validateCheckout, confirmCheckout, checkin } from '../controllers/studentController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Protegendo rotas com JWT
router.use(authenticateJWT);

router.get('/', getStudents);
router.post('/checkin', checkin);
router.post('/checkout/validate', validateCheckout);
router.post('/checkout/confirm', confirmCheckout);

export default router;
