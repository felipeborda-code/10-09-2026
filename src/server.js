import express from 'express'
import routes from './routes/routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

// Trata erros que não foram previstos.
app.use((erro, req, res, next) => {
    console.error(erro)
    res.status(500).json({ erro: 'Erro interno do servidor' })
})

// Iniciar servidor
app.listen(port, () => {
    console.log(`API rodando em: http://localhost:${port}`)
})