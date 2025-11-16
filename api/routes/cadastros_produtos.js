import express from 'express'
import {
getCadastros,
insertCadastros,
editCadastro,
// getCadastroSearch
} from '../controllers/cadastro_produtos.js'

const router = express.Router()


/**
 * @swagger
 * tags:
 *   name: Cadastros
 *   description: Endpoints para gerenciar cadastros de produtos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cadastro:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-11-04T00:13:48.000Z"
 *         remetente:
 *           type: string
 *           example: "Cartonaria"
 *         destinatario:
 *           type: string
 *           example: "Patrick"
 *         observacao:
 *           type: string
 *           example: "Teste de envio"
 *       required:
 *         - remetente
 *         - destinatario
 */

/**
 * @swagger
 * /cadastros:
 *   get:
 *     summary: Retorna cadastros com filtros, paginação, ordenação por data (mais recentes primeiro) e filtro opcional por id
 *     tags: [Cadastros]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: Filtra pelo id exato do cadastro. Se não for fornecido, todos os cadastros são retornados.
 *       - in: query
 *         name: destinatario
 *         schema:
 *           type: string
 *         description: Filtra pelo nome do destinatário (busca parcial usando LIKE)
 *       - in: query
 *         name: remetente
 *         schema:
 *           type: string
 *         description: Filtra pelo nome do remetente (busca parcial usando LIKE)
 *       - in: query
 *         name: observacao
 *         schema:
 *           type: string
 *         description: Filtra pela observação cadastrada (busca parcial usando LIKE)
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *         description: Número da página para paginação (20 registros por página). O valor padrão é 1.
 *     responses:
 *       200:
 *         description: Lista de cadastros retornada com sucesso, filtrada e ordenada por data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cadastro'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */

/**
 * @swagger
 * /cadastros:
 *   post:
 *     summary: Cria um novo cadastro
 *     tags: [Cadastros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remetente:
 *                 type: string
 *                 example: "Cartonaria"
 *               destinatario:
 *                 type: string
 *                 example: "Patrick"
 *               observacao:
 *                 type: string
 *                 example: "Teste de envio"
 *     responses:
 *       201:
 *         description: Cadastro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cadastro criado com sucesso."
 *                 id:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Campos obrigatórios não enviados."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao salvar cadastro"
 */

/**
 * @swagger
 * /cadastros/edit/{id}:
 *   put:
 *     summary: Atualiza os dados de um cadastro existente
 *     tags: [Cadastros]
 *     description: Atualiza as informações de remetente, destinatário e observação de um cadastro.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               remetente:
 *                 type: string
 *                 example: "João Silva"
 *               destinatario:
 *                 type: string
 *                 example: "Maria Oliveira"
 *               observacao:
 *                 type: string
 *                 example: "Entrega programada para a próxima semana."
 *     responses:
 *       200:
 *         description: Cadastro atualizado com sucesso
 *       404:
 *         description: Cadastro não encontrado
 *       500:
 *         description: Erro no servidor
 */


router.get('/', getCadastros)

router.post('/', insertCadastros)

router.put('/edit/:id', editCadastro)

export default router