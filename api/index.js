import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cadastros_routes from './routes/cadastros_produtos.js'  

const app = express();

// Configuração do Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Minha API',
            version: '1.0.0',
            desctiption: 'API para gerenciar usuários'
        },
    },
    apis: ['./routes/cadastros_produtos.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Api online!')
})

app.use('/cadastros', cadastros_routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})