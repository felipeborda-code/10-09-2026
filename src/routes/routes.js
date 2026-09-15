import { Router } from 'express'
import { EquipamentoService } from '../services/services.js'

const router = Router()
const equipamentoService = new EquipamentoService()

// Campos necessários para cadastrar um equipamento.
const camposObrigatorios = [
	'nome',
	'categoria',
	'condicao_de_uso',
	'disponibilidade'
]

const campoAusente = (valor) => valor === undefined || valor === null || valor === ''

// Verifica se a API está funcionando.
router.get('/', (req, res) => {
	res.json({
		mensagem: 'API de equipamentos funcionando',
		rotas: ['/equipamentos', '/equipamentos/:id']
	})
})

router.get('/health', (req, res) => {
	res.json({ status: 'ok' })
})

// Lista todos os equipamentos.
router.get('/equipamentos', async (req, res) => {
	const equipamentos = await equipamentoService.listarTodos()
	res.json(equipamentos)
})

router.get('/equipamentos/:id', async (req, res) => {
	const equipamento = await equipamentoService.buscarPorId(req.params.id)

	if (!equipamento) {
		return res.status(404).json({ erro: 'Equipamento não encontrado' })
	}

	res.json(equipamento)
})

// Cadastra um novo equipamento.
router.post('/equipamentos', async (req, res) => {
	const camposFaltantes = camposObrigatorios.filter((campo) => campoAusente(req.body?.[campo]))

	if (camposFaltantes.length > 0) {
		return res.status(400).json({
			erro: 'Dados obrigatórios ausentes',
			campos: camposFaltantes
		})
	}

	const equipamento = await equipamentoService.cadastrar(req.body)
	res.status(201).json(equipamento)
})

// Altera a disponibilidade de um equipamento.
router.patch('/equipamentos/:id/disponibilidade', async (req, res) => {
	if (campoAusente(req.body?.disponibilidade)) {
		return res.status(400).json({ erro: 'O campo disponibilidade é obrigatório' })
	}

	const equipamento = await equipamentoService.alterarDisponibilidade(
		req.params.id,
		req.body.disponibilidade
	)

	if (!equipamento) {
		return res.status(404).json({ erro: 'Equipamento não encontrado' })
	}

	res.json(equipamento)
})

export default router
