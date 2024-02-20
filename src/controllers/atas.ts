import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const criarAta = async (req: Request, res: Response) => {
	try {
		const { workshopId } = req.body;

		const workshopExistente = await prisma.workshop.findUnique({
			where: { id: workshopId },
		});

		if (!workshopExistente) {
			return res.status(404).json({ error: 'Workshop não encontrado' });
		}

		const Ata = await prisma.ata.create({
			data: {
				workshopId,
			},
		});

		res.status(201).json(Ata);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao criar Ata' });
	}
};

export const adicionarColaboradorNaAta = async (
	req: Request,
	res: Response
) => {
	try {
		const { ataId, colaboradorId } = req.params;

		const ataExistente = await prisma.ata.findUnique({
			where: { id: Number(ataId) },
		});

		const colaboradorExistente = await prisma.colaborador.findUnique({
			where: { id: Number(colaboradorId) },
		});

		if (!ataExistente || !colaboradorExistente) {
			return res
				.status(404)
				.json({ error: 'Ata ou Colaborador não encontrado' });
		}

		const colaboradorJaAssociado = await prisma.colaboradorAta.findFirst({
			where: {
				colaboradorId: Number(colaboradorId),
				ataId: Number(ataId),
			},
		});

		if (colaboradorJaAssociado) {
			return res
				.status(400)
				.json({ error: 'Colaborador já está associado à Ata' });
		}

		const colaboradorNaAta = await prisma.colaboradorAta.create({
			data: {
				ataId: Number(ataId),
				colaboradorId: Number(colaboradorId),
			},
		});

		res.json(colaboradorNaAta);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao adicionar Colaborador à Ata' });
	}
};

export const removerColaboradorDaAta = async (req: Request, res: Response) => {
	try {
		const { ataId, colaboradorId } = req.params;

		const colaboradorNaAta = await prisma.colaboradorAta.findFirst({
			where: {
				ataId: Number(ataId),
				colaboradorId: Number(colaboradorId),
			},
		});

		if (!colaboradorNaAta) {
			return res
				.status(404)
				.json({ error: 'Colaborador não está associado à Ata' });
		}

		await prisma.colaboradorAta.delete({
			where: {
				id: colaboradorNaAta.id,
			},
		});

		res.json({ message: 'Colaborador removido da Ata com sucesso' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao remover Colaborador da Ata' });
	}
};

export const obterAtasPorFiltros = async (req: Request, res: Response) => {
	try {
		const { workshopNome, data } = req.query;

		if (!workshopNome && !data) {
			return res
				.status(400)
				.json({ error: 'Parâmetros workshopNome e/ou data são obrigatórios' });
		}

		const condicoesConsulta: any = {};

		if (workshopNome) {
			condicoesConsulta.nome = {
				contains: workshopNome.toString(),
			};
		}

		if (data) {
			condicoesConsulta.dataRealizacao = {
				equals: new Date(data.toString()),
			};
		}

		const resultado = await prisma.workshop.findMany({
			where: condicoesConsulta,
			include: {
				Ata: {
					include: {
						ColaboradorAta: {
							include: {
								colaborador: true,
							},
						},
					},
				},
			},
		});

		res.json(resultado);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Erro ao obter workshops por filtros' });
	}
};
