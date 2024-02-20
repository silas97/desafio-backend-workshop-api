import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const cadastrarColaborador = async (req: Request, res: Response) => {
	try {
		const { nome } = req.body;
		const colaborador = await prisma.colaborador.create({
			data: {
				nome,
			},
		});
		res.json(colaborador);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao cadastrar colaborador' });
	}
};

export const listarColaboradores = async (_: Request, res: Response) => {
	try {
		const colaboradores = await prisma.colaborador.findMany({
			orderBy: {
				nome: 'asc',
			},
			include: {
				ColaboradorAta: {
					include: {
						ata: {
							include: {
								workshop: true,
							},
						},
					},
				},
			},
		});

		res.json(colaboradores);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao listar colaboradores' });
	}
};
