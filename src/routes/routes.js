import { Router } from 'express'
import { EquipamentoService } from '../services/services.js'

const router = Router()
const equipamentoService = new EquipamentoService()

router.get('/', (req, res) => {
	res.json({
		mensagem: 'API de equipamentos funcionando',
		rotas: ['/equipamentos', '/equipamentos/:id']
	})
})

router.get('/equipamentos', async (req, res) => {
	try {
		const equipamentos = await equipamentoService.listarTodos()
		res.json(equipamentos)
	} catch (erro) {
		console.error('Erro ao listar equipamentos:', erro)
		res.status(500).json({ erro: 'Erro ao buscar equipamentos' })
	}
})

router.get('/equipamentos/:id', async (req, res) => {
	try {
		const equipamento = await equipamentoService.buscarPorId(req.params.id)

		if (!equipamento) {
			return res.status(404).json({ erro: 'Equipamento não encontrado' })
		}

		res.json(equipamento)
	} catch (erro) {
		console.error('Erro ao buscar equipamento:', erro)
		res.status(500).json({ erro: 'Erro ao buscar equipamento' })
	}
})

router.post('/equipamentos', async (req, res) => {
	try {
		const equipamento = await equipamentoService.cadastrar(req.body)
		res.status(201).json(equipamento)
	} catch (erro) {
		console.error('Erro ao cadastrar equipamento:', erro)
		res.status(500).json({ erro: 'Erro ao cadastrar equipamento' })
	}
})

router.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
	try {
		const equipamento = await equipamentoService.alterarDisponibilidade(
			req.params.id,
			req.body.disponibilidade
		)

		if (!equipamento) {
			return res.status(404).json({ erro: 'Equipamento não encontrado' })
		}

		res.json(equipamento)
	} catch (erro) {
		console.error('Erro ao alterar disponibilidade:', erro)
		res.status(500).json({ erro: 'Erro ao alterar disponibilidade' })
	}
})

export default router
