const appUrl = process.env.APP_URL
export default {
    title: "Organization Positions",
    path: 'organizations/positions',
    permission: "organization_positions.list",
    content: {
        type: "crud",
        value: {
            endpoint: '/table/organization_positions',
            create: { 
                label: 'Create', icon: 'plus', permission: "organization_positions.create", title: "Create Position",
                modalClass: 'modal-md',
                fields: [
                    { 
                        name: "organization_id", label: "Organization", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'name'},
                            initList: {
                                url: '/table/organizations',
                                key: 'organization_id',
                                response: {id: 'id', text: 'name'},
                            },
                            url: appUrl + '/table/organizations',
                        },
                        defaultValue: 'organization_id',
                        defaultFrom: 'queryParam'
                    },
                    { 
                        name: "parent_id", label: "Parent", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'label'},
                            url: appUrl + '/app/organizations/positions/parent-lists',
                            urlParams: [
                                {key: 'organization_id', value: 'organization_id'},
                            ]
                        }
                    },
                    { name: "name", label: "Name", type: "text"},
                    { name: "status", label: "Status", type: "select", defaultValue: 'active', options: [
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                    ]},
                ]
            },
            actions: [
                { 
                    label: 'Edit', type: 'edit', icon: 'edit-2', permission: "organization_positions.update", title: "Edit Position",
                    modalClass: 'modal-md',
                    fields: [
                        { 
                            name: "organization_id", label: "Organization", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'name'},
                                initList: {
                                    url: '/table/organizations',
                                    key: 'organization_id',
                                    from: 'data',
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/table/organizations',
                            }
                        },
                        { 
                            name: "parent_id", label: "Parent", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'label'},
                                initList: {
                                    url: '/table/organization_positions',
                                    key: 'parent_id',
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/app/organizations/positions/parent-lists',
                                urlParams: [
                                    {key: 'id', value: 'id'},
                                    {key: 'organization_id', value: 'organization_id'},
                                ]
                            }
                        },
                        { name: "name", label: "Name", type: "text"},
                        { name: "status", label: "Status", type: "select", defaultValue: 'active', options: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                        ]},
                    ]
                },
                { label: 'Delete', type: 'delete', icon: 'trash', class:'text-danger', permission: "organization_positions.delete"},
            ],

            columns: [
                { key: "organization_name", label: "Organization", sortable: true, searchable: true },
                { key: "parent_name", label: "Parent", sortable: true, searchable: true },
                { key: "name", label: "Name", sortable: true, searchable: true },
                { 
                    key: "status", label: "Status", sortable: true, searchable: true,
                    type: "status-badge", 
                    badge: {
                        color:{'active': 'success', 'inactive': 'danger'}, 
                        label:{'active':'Active', 'inactive':'Inactive'}
                    }
                },
                { key: "created_at", label: "Created At", sortable: true,type: "date" },
                { key: "updated_at", label: "Updated At", sortable: true,type: "date" },
            ],
        }
    }
}