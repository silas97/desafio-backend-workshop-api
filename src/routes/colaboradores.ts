import express from 'express';
import {
	cadastrarColaborador,
	listarColaboradores,
} from '../controllers/colaboradores';

const router = express.Router();

router.post('/', cadastrarColaborador);
router.get('/', listarColaboradores);

export default router;
