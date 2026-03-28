import { getTable } from '#database/database.registry.js'
import { literal, Op } from 'sequelize'

export function organizationRouter(router){
    router.get('/parent-lists', async function(req, res, next){
        const table = getTable('organizations')
        const where = {}

        if(req.query.id)
        {
            where.id = {[Op.ne]: req.query.id}
        }

        const organizations = await table.model.findAll({
            attributes: [
                'id',
                [literal("CONCAT(REPEAT('-- ', level), name)"), 'label']
            ],
            where,
            order: [['path', 'ASC']]
        });

        res.json({
            data: organizations,
            message: 'success'
        })
    });

    router.get('/positions', async function(req, res, next){
        const table = getTable('organization_positions')
        const where = {}
        var positions = []

        if(req.query.id)
        {
            where.id = {[Op.ne]: req.query.id}
        }
        
        if(req.query.organization_id)
        {
            where.organization_id = req.query.organization_id
            positions = await table.model.findAll({
                attributes: [
                    'id',
                    ['name', 'label']
                ],
                where
            });
        }

        res.json({
            data: positions,
            message: 'success'
        })
    });

    router.get('/positions/parent-lists', async function(req, res, next){
        const table = getTable('organization_positions')
        const where = {}
        var positions = []

        if(req.query.id)
        {
            where.id = {[Op.ne]: req.query.id}
        }
        
        if(req.query.organization_id)
        {
            where.organization_id = req.query.organization_id
            positions = await table.model.findAll({
                attributes: [
                    'id',
                    ['name', 'label']
                ],
                where
            });
        }

        res.json({
            data: positions,
            message: 'success'
        })
    });
}