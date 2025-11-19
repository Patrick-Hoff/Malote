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
 *     summary: Retorna a lista de cadastros com filtros opcionais e paginação
 *     tags: [Cadastros]
 *     description: >
 *       Este endpoint retorna cadastros aplicando filtros opcionais por **id**, **destinatário**,  
 *       **remetente** e **observação**, além de paginação e ordenação por data (mais recentes primeiro).  
 *       Caso nenhuma correspondência seja encontrada, o endpoint retorna um objeto informando  
 *       `"Nenhum cadastro encontrado."` e `data` como um array vazio.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *           example: "12"
 *         description: >
 *           Filtro opcional pelo ID (busca parcial usando LIKE).  
 *           Caso não seja informado, todos os IDs são considerados.
 *       - in: query
 *         name: destinatario
 *         schema:
 *           type: string
 *           example: "Estoque"
 *         description: Filtro parcial pelo destinatário (usando LIKE).
 *       - in: query
 *         name: remetente
 *         schema:
 *           type: string
 *           example: "Fornecedor"
 *         description: Filtro parcial pelo remetente (usando LIKE).
 *       - in: query
 *         name: observacao
 *         schema:
 *           type: string
 *           example: "urgente"
 *         description: Filtro parcial pela observação registrada.
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *         description: Número da página para paginação (20 registros por página). O padrão é **1**.
 *     responses:
 *       200:
 *         description: Lista de cadastros retornada com sucesso. Pode retornar lista vazia com mensagem.
 *         content:
 *           application/json:
 *             oneOf:
 *               - description: Retorno com dados encontrados
 *                 schema:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cadastro'
 *               - description: Nenhum cadastro encontrado
 *                 schema:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Nenhum cadastro encontrado."
 *                     data:
 *                       type: array
 *                       example: []
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