import { db } from '../db.js'

export const getCadastros = (req, res) => {
    try {
        const id = req.query.id ? `%${req.query.id}%` : '%';
        const destinatario = req.query.destinatario || '';
        const remetente = req.query.remetente || '';
        const observacao = req.query.observacao || '';

        const pagina = parseInt(req.query.pagina) || 1;
        const limit = 20;
        const offset = (pagina - 1) * limit;

        const q = `
            SELECT * FROM cadastros
            WHERE CAST(id AS CHAR) LIKE ?
            AND destinatario LIKE ?
            AND remetente LIKE ?
            AND observacao LIKE ?
            ORDER BY data DESC
            LIMIT ?
            OFFSET ?
        `;

        const values = [
            id,
            `%${destinatario}%`,
            `%${remetente}%`,
            `%${observacao}%`,
            limit,
            offset
        ];

        db.query(q, values, (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: "Erro ao buscar cadastros",
                    details: err
                });
            }

            if(data.length === 0) {
                return res.status(200).json({
                    message: 'Nenhum cadastro encontrado.',
                    data: []
                })
            }
            return res.status(200).json(data);
        });
    } catch (error) {
        return res.status(500).json({
            error: "Erro interno ao processar sua requisição.",
            details: error
        });
    }
};


export const insertCadastros = (req, res) => {
    try {
        const { remetente, destinatario, observacao } = req.body;

        // Validação simples
        if (!remetente || !destinatario) {
            return res.status(400).json({
                error: "Campos 'remetente' e 'destinatario' são obrigatórios."
            });
        }

        const q = `
            INSERT INTO cadastros (remetente, destinatario, observacao) 
            VALUES (?, ?, ?)
        `;

        db.query(q, [remetente, destinatario, observacao], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    error: 'Erro ao salvar cadastro'
                });
            }

            return res.status(201).json({
                message: 'Cadastro criado com sucesso.',
                id: result.insertId
            });
        });

    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno ao salvar o cadastro.'
        });
    }
};

export const editCadastro = (req, res) => {
    try {

        const id = req.params.id;
        const { remetente, destinatario, observacao } = req.body

        const values = [
            remetente,
            destinatario,
            observacao
        ]

        const q = `UPDATE cadastros
               SET remetente = ?, destinatario = ?, observacao = ? 
               WHERE id = ?;`

        db.query(q, [...values, id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: 'Erro ao realizar a alteração'
                })
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Cadastro não encontrado'
                })
            }

            return res.status(200).json({
                message: 'Cadastro atualizado com sucesso'
            })

        })
    } catch (error) {
        return res.status(500).json({
            error: 'Erro interno ao realizar a alteração'
        })
    }
}