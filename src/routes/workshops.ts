import express from 'express';
import { cadastrarWorkshop, listarWorkshops } from '../controllers/workshops';

const router = express.Router();

router.post('/', cadastrarWorkshop);
router.get('/', listarWorkshops);

export default router;
