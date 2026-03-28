export default {
    organizations: {
        label: "Organizations",
        icon: "layers",
        permissions: ["organization_positions.list",'organizations.list','organization_people.list'],
        activeState:['/organization-positions','/organizations','/organization-people'],
        children: {
            list: {
                label: 'Lists',
                route: '/organizations',
                permission: "organizations.list",
                activeState:['/organizations'],
            },
            positions: {
                label: 'Positions',
                route: '/organization-positions',
                permission: "organization_positions.list",
                activeState:['/organization-positions'],
            },
            member: {
                label: 'Member',
                route: '/organization-people',
                permission: "organization_people.list",
                activeState:['/organization-people'],
            },
        }
    },
}