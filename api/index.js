import express from 'express';
import cors from 'cors';  

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Api online!')
})

// app.use()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})