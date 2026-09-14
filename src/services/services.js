import { pool } from '../database/db.js'

export class EquipamentoService {
	async listarTodos() {
		const resultado = await pool.query(
			'SELECT * FROM equipamentos ORDER BY id_equipamentos'
		)

		return resultado.rows
	}

	async buscarPorId(id) {
		const resultado = await pool.query(
			'SELECT * FROM equipamentos WHERE id_equipamentos = $1',
			[id]
		)

		return resultado.rows[0] || null
	}

	async cadastrar({ nome, categoria, condicao_de_uso, disponibilidade }) {
		const resultado = await pool.query(
			`INSERT INTO equipamentos (nome, categoria, condicao_de_uso, disponibilidade)
			 VALUES ($1, $2, $3, $4)
			 RETURNING *`,
			[nome, categoria, condicao_de_uso, disponibilidade]
		)

		return resultado.rows[0]
	}

	async alterarDisponibilidade(id, disponibilidade) {
		const resultado = await pool.query(
			`UPDATE equipamentos
			 SET disponibilidade = $1
			 WHERE id_equipamentos = $2
			 RETURNING *`,
			[disponibilidade, id]
		)

		return resultado.rows[0] || null
	}
}
