export default {
    organizations: {
        label: "Organizations",
        icon: "layers",
        permissions: ["organization_positions.list",'organizations.list','organization_people.list'],
        activeState:['/organizations/positions','/organizations/lists','/organizations/member'],
        children: {
            list: {
                label: 'Lists',
                route: '/organizations/lists',
                permission: "organizations.list",
                activeState:['/organizations/lists'],
            },
            positions: {
                label: 'Positions',
                route: '/organizations/positions',
                permission: "organization_positions.list",
                activeState:['/organizations/positions'],
            },
            member: {
                label: 'Member',
                route: '/organizations/member',
                permission: "organization_people.list",
                activeState:['/organizations/member'],
            },
        }
    },
}