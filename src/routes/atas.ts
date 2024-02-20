import express from 'express';
import {
	criarAta,
	adicionarColaboradorNaAta,
	removerColaboradorDaAta,
	obterAtasPorFiltros,
} from '../controllers/atas';

const router = express.Router();

router.post('/', criarAta);
router.put('/:ataId/colaboradores/:colaboradorId', adicionarColaboradorNaAta);
router.delete('/:ataId/colaboradores/:colaboradorId', removerColaboradorDaAta);
router.get('/', obterAtasPorFiltros);

export default router;
