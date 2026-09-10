import express from 'express'
import { pool } from './database/db.js'

const app = express()
const port = 3000

app.use(express.json())

// Rota para buscar todos os equipamentos
app.get('/equipamentos', async (req, res) => {
    try {
        const resultado = await pool.query(
            'SELECT * FROM equipamentos'
        )

        res.json(resultado.rows)
    } catch (erro) {
        console.error('Erro no banco:', erro)

        res.status(500).json({
            erro: 'Erro ao buscar equipamentos'
        })
    }
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`API rodando em: http://localhost:${port}`)
})