import { DataTypes } from "#database/database.sequelize.js";

const responseField = {
    id: {},
    parent_id: {},
    top_parent: {},
    parent_name: {
        relation: true,
        value: 'parent.name'
    },
    code: {searchable: true},
    name: {searchable: true},
    type: {},
    description: {searchable: true},
    level: {},
    path: {},
    status: {},
    phone: {},
    email: {},
    address: {},
    is_workspace: {},
    start_date: {},
    end_date: {},
    metadata: {},
    created_at: {},
    updated_at: {},
}

export default {

    name: 'organizations',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            top_parent: {
                type: DataTypes.VIRTUAL,
                get() {

                    const path = this.getDataValue('path')

                    if (!path) return null

                    return path.split('/')[0]

                }
            },

            parent_id: {
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull: true
            },

            code: {
                type: DataTypes.STRING(50)
            },

            name: {
                type: DataTypes.STRING(150)
            },

            type: {
                type: DataTypes.STRING(50)
            },

            description: {
                type: DataTypes.TEXT
            },

            level: {
                type: DataTypes.INTEGER
            },

            path: {
                type: DataTypes.STRING(255)
            },
            
            phone: {
                type: DataTypes.STRING(255)
            },
            email: {
                type: DataTypes.STRING(255)
            },
            address: {
                type: DataTypes.TEXT
            },
            is_workspace: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            status: {
                type: DataTypes.ENUM('active','inactive','archived'),
                defaultValue: 'active'
            },

            start_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                set(value){
                    this.setDataValue('start_date', value === '' ? null : value)
                }
            },

            end_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                set(value){
                    this.setDataValue('end_date', value === '' ? null : value)
                }
            },

            metadata: {
                type: DataTypes.JSON,
                allowNull: true
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
            tableName: 'organizations',
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
                as: 'parent',
                foreignKey: 'parent_id'
            }
        ]

    },

    permissions: [
        'organizations.list',
        'organizations.single',
        'organizations.create',
        'organizations.update',
        'organizations.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    },

    events: {
        beforeCreate: context => {
            if(!context.payload.parent_id)
            {
                delete context.payload.parent_id
            }

            return context
        },
        beforeUpdate: context => {
            if(!context.payload.parent_id)
            {
                delete context.payload.parent_id
            }

            return context
        },
        afterCreate: async function(context){
            let level = 0
            let path = `${context.data.id}`

            if (context.data.parent_id) {

                const parent = await context.table.model.findByPk(context.data.parent_id)

                if (parent) {
                    level = parent.level + 1
                    path = `${parent.path}/${context.data.id}`
                }

            }

            await context.table.model.update({
                level,
                path
            }, { where: {id: context.data.id }})
        },
        afterUpdate: async function(context){
            if (context.data.parent_id == context.oldData.parent_id) return

            let level = 0
            let path = `${context.data.id}`

            if (context.data.parent_id) {

                const parent = await context.table.model.findByPk(context.data.parent_id)

                if (parent) {
                    level = parent.level + 1
                    path = `${parent.path}/${context.data.id}`
                }

            }

            await context.table.model.update({
                level,
                path
            }, { where: {id: context.data.id }})
        }
    }

}