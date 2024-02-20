import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const cadastrarWorkshop = async (req: Request, res: Response) => {
	try {
		const { nome, dataRealizacao, descricao } = req.body;

		if (!nome || !dataRealizacao || !descricao) {
			return res
				.status(400)
				.json({ error: 'Todos os campos são obrigatórios' });
		}

		const workshop = await prisma.workshop.create({
			data: {
				nome,
				dataRealizacao,
				descricao,
			},
		});

		res.status(201).json(workshop);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao cadastrar workshop' });
	}
};

export const listarWorkshops = async (_: Request, res: Response) => {
	try {
		const workshops = await prisma.workshop.findMany();
		res.json(workshops);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao listar workshops' });
	}
};
