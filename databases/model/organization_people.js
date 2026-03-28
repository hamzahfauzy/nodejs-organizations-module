import { DataTypes } from "#database/database.sequelize.js";
import { getModel } from "#database/database.registry.js";

const responseField = {
    id: {},
    people_id: {},
    position_id: {},
    position_name: {
        relation: true,
        searchable: true,
        value: 'position.name'
    },
    organization_id: {},
    organization_name: {
        relation: true,
        searchable: true,
        value: 'organization.name'
    },
    role: {searchable: true},
    is_primary: {},
    start_date: {},
    end_date: {},
    status: {},
    notes: {},
    code: { 
        relation: true,
        value: 'people.code',
        searchable: true
    },
    first_name: { 
        relation: true,
        value: 'people.first_name',
        searchable: true 
    },
    last_name: { 
        relation: true,
        value: 'people.last_name',
        searchable: true 
    },
    full_name: { 
        relation: true,
        value: 'people.full_name',
        searchable: true 
    },
    email: { 
        relation: true,
        value: 'people.email',
        searchable: true 
    },
    phone: { 
        relation: true,
        value: 'people.phone',
        searchable: true 
    },
    gender: {
        relation: true,
        value: 'people.gender',
    },
    birth_date: {
        relation: true,
        value: 'people.birth_date',
    },
    birth_place: {
        relation: true,
        value: 'people.birth_place',
        searchable: true
    },
    address: {
        relation: true,
        value: 'people.address',
    },
    identity_number: {
        relation: true,
        searchable: true,
        value: 'people.identity_number',
    },
    city: {
        relation: true,
        value: 'people.city',
        searchable: true
    },
    postal_code: {
        relation: true,
        value: 'people.postal_code',
        searchable: true
    },
    state: {
        relation: true,
        value: 'people.state',
        searchable: true
    },
    country: {
        relation: true,
        value: 'people.country',
        searchable: true
    },
    created_at: {},
    updated_at: {},
}

export default {

    name: 'organization_people',

    schema: {

        fields: {

            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                primaryKey: true,
                autoIncrement: true
            },

            people_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            organization_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },
            
            position_id: {
                type: DataTypes.BIGINT.UNSIGNED
            },

            role: {
                type: DataTypes.STRING(100)
            },

            is_primary: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
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

            status: {
                type: DataTypes.ENUM('active','inactive'),
                defaultValue: 'active'
            },

            notes: {
                type: DataTypes.TEXT
            },

            created_at: {
                type: DataTypes.DATE
            },

            updated_at: {
                type: DataTypes.DATE
            }

        },

        options: {
            tableName: 'organization_people',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },

        relations: [
            {
                modelName: 'organization_positions',
                type: 'belongsTo',
                as: 'position',
                foreignKey: 'position_id'
            },
            {
                modelName: 'organizations',
                type: 'belongsTo',
                as: 'organization',
                foreignKey: 'organization_id'
            },
            {
                modelName: 'people',
                type: 'belongsTo',
                as: 'people',
                foreignKey: 'people_id'
            }
        ]

    },

    permissions: [
        'organization_people.list',
        'organization_people.single',
        'organization_people.create',
        'organization_people.update',
        'organization_people.delete'
    ],

    response: {
        list: responseField,
        single: responseField
    },

    events: {
        beforeCreate: async function(context){
            const organizationModel = getModel('organizations')
            
            const organization = await organizationModel.findByPk(context.payload.organization_id)
            var people_id = null
            if(context.payload.member_type == 'new')
            {
    
                const peoplePayload = {...context.payload}
                peoplePayload.organization_id = organization.top_parent
    
                delete peoplePayload.people_id
                delete peoplePayload.start_date
                delete peoplePayload.end_date
                delete peoplePayload.role
                delete peoplePayload.status
                delete peoplePayload.position_id
    
                const people = getModel('people')
                const row = await people.create(peoplePayload)
                people_id = row.id
            }
            else
            {
                people_id = context.payload.people_id
                const peopleModel = getModel('people')
                const people = await peopleModel.findByPk(people_id)
                if(!people.organization_id)
                {
                    await people.update({
                        organization_id: organization.top_parent
                    }, {
                        where: { id: people_id }
                    })
                }
            }

            const memberPayload = {
                organization_id: context.payload.organization_id,
                position_id: context.payload.position_id,
                start_date: context.payload.start_date,
                end_date: context.payload.end_date,
                role: context.payload.role,
                status: context.payload.status,
                people_id
            }

            context.payload = memberPayload
        },
        beforeUpdate: async function(context){
            const peoplePayload = {...context.payload}

            delete peoplePayload.organization_id
            delete peoplePayload.start_date
            delete peoplePayload.end_date
            delete peoplePayload.role
            delete peoplePayload.status
            delete peoplePayload.position_id

            const people = getModel('people')
            await people.update(peoplePayload, {
                where: { id: context.oldData.people_id }
            })

            const memberPayload = {
                organization_id: context.payload.organization_id,
                position_id: context.payload.position_id,
                start_date: context.payload.start_date,
                end_date: context.payload.end_date,
                role: context.payload.role,
                status: context.payload.status,
                people_id: context.oldData.people_id
            }

            context.payload = memberPayload
        }
    }

}