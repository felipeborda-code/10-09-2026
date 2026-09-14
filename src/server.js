import express from 'express'
import routes from './routes/routes.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(routes)

// Iniciar servidor
app.listen(port, () => {
    console.log(`API rodando em: http://localhost:${port}`)
})