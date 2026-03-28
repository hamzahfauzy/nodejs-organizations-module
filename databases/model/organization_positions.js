import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    parent_id: {},
    organization_id: {},
    organization_name: {
        relation: true,
        value: 'organization.name'
    },
    parent_name: {
        relation: true,
        value: 'parent.name'
    },
    name: {searchable: true},
    status: {},
    created_at: {},
    updated_at: {},
}

export default {

    name: 'organization_positions',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            parent_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true,
                set(value){
                    this.setDataValue('parent_id', value === '' ? null : value)
                }
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            name: {
                type: DataTypes.STRING(100)
            },

            status: {
                type: DataTypes.ENUM('active','inactive'),
                defaultValue: 'active'
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            },

            deleted_at: {
                type: DataTypes.DATE
            }

        },

        options: {
            tableName: 'organization_positions',
            timestamps: true,
            paranoid: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            deletedAt: 'deleted_at'
        },

        relations: [
            {
                modelName: 'organizations',
                type: 'belongsTo',
                as: 'organization',
                foreignKey: 'organization_id'
            },
            {
                modelName: 'organization_positions',
                type: 'belongsTo',
                as: 'parent',
                foreignKey: 'parent_id'
            }
        ]

    },

    permissions: [
        'organization_positions.list',
        'organization_positions.single',
        'organization_positions.create',
        'organization_positions.update',
        'organization_positions.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    },

    hooks: {
        beforeCreate: async function(context){
            if (!context.payload.parent_id) return

            const parent = await context.req.table.model.findByPk(context.payload.parent_id)
            const validationError = {
                    abort: true,
                    status: 422,
                    message: 'Validation Error',
                }

            if (!parent) {
                validationError.errors = ['Parent position not valid']
                return validationError;
            }

            if (parseInt(parent.organization_id) !== parseInt(context.payload.organization_id)) {
                validationError.errors = ['Parent position must belong to the same organization']
                return validationError;
            }

            const validate = {payload: context.payload}

            return validate
        },
        beforeUpdate: async function(context){
            if (!context.payload.parent_id) return

            const parent = await context.req.table.model.findByPk(context.payload.parent_id)

            const validationError = {
                abort: true,
                status: 422,
                message: 'Validation Error',
            }

            if (!parent) {
                validationError.errors = ['Parent position not valid']
                return validationError;
            }

            if (parseInt(parent.organization_id) !== parseInt(context.payload.organization_id)) {
                validationError.errors = ['Parent position must belong to the same organization']
                return validationError;
            }

            const validate = {payload: context.payload}

            return validate
        }
    }

}