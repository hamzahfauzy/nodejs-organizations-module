const appUrl = process.env.APP_URL
export default {
    title: "Member",
    path: 'organization-people',
    permission: "organization_people.list",
    content: {
        type: "crud",
        value: {
            endpoint: '/table/organization_people',
            create: { 
                label: 'Create', icon: 'plus', permission: "organization_people.create", title: "Create Member",
                modalClass: "modal-lg",
                fields: [
                    { 
                        name: "member_type", label: "Type", type: "select", defaultValue: 'new',
                        options: [
                            {label: 'New', value: 'new'},
                            {label: 'Existing', value: 'existing'},
                        ] 
                    },
                    { 
                        name: "people_id", label: "People", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'full_name'},
                            url: appUrl + '/table/people',
                        },
                        show_if: {field: 'member_type', operator: 'equals', value: 'existing'}
                    },
                    { 
                        name: "organization_id", label: "Organization", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'name'},
                            url: appUrl + '/table/organizations',
                            initList: {
                                url: '/table/organizations',
                                key: 'organization_id',
                                response: {id: 'id', text: 'name'},
                            },
                        },
                        defaultValue: 'organization_id',
                        defaultFrom: 'queryParam'
                    },
                    { 
                        name: "position_id", label: "Position", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'label'},
                            url: appUrl + '/app/organizations/positions',
                            urlParams: [
                                {key: 'organization_id', value: 'organization_id'},
                            ]
                        }
                    },
                    { name: "code", label: "Code", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "identity_number", label: "Identity Number", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "first_name", label: "First Name", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "last_name", label: "Last Name", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "gender", label: "Gender", type: "select", options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}], show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "birth_date", label: "Birth Date", type: "datePicker", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "birth_place", label: "Birth Place", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "email", label: "Email", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "phone", label: "Phone", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "address", label: "Address", type: "textArea", className: 'col-md-12', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "city", label: "City", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "state", label: "State", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "postal_code", label: "Postal Code", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "country", label: "Country", type: "text", className: 'col-md-6', show_if: {field: 'member_type', operator: 'equals', value: 'new'} },
                    { name: "start_date", label: "Start Date", type: "datePicker", className: 'col-md-6' },
                    { name: "end_date", label: "End Date", type: "datePicker", className: 'col-md-6' },
                    { name: "role", label: "Role", type: "text", className: 'col-md-6' },
                    { name: "status", label: "Status", type: "select", defaultValue: 'active', className: 'col-md-6', options: [
                        {label: 'Active', value: 'active'},
                        {label: 'Inactive', value: 'inactive'},
                    ] },
                ]
            },
            actions: [
                { 
                    label: 'Detail', type: 'view', icon: 'eye', permission: "organization_people.single", title: 'Member Detail',
                    modalClass: "modal-lg",
                    fields: [
                        { name: "organization_name", label: "Organization", type: "text", className: 'col-md-6' },
                        { name: "position_name", label: "Position", type: "text", className: 'col-md-6' },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "identity_number", label: "Identity Number", type: "text", className: 'col-md-6' },
                        { name: "full_name", label: "Full Name", type: "text", className: 'col-md-6' },
                        { name: "gender", label: "Gender", type: "status-badge", className: 'col-md-6', 
                            badge: {
                                color:{'male': 'info', 'female': 'warning'}, 
                                label:{'male':'Male', 'female':'Female'}
                            }
                        },
                        { name: "birth_date", label: "Birth Date", type: "text", className: 'col-md-6' },
                        { name: "birth_place", label: "Birth Place", type: "text", className: 'col-md-6' },
                        { name: "email", label: "Email", type: "text", className: 'col-md-6' },
                        { name: "phone", label: "Phone", type: "text", className: 'col-md-6' },
                        { name: "address", label: "Address", type: "text" },
                        { name: "city", label: "City", type: "text", className: 'col-md-6' },
                        { name: "postal_code", label: "Postal Code", type: "text", className: 'col-md-6' },
                        { name: "country", label: "Country", type: "text", className: 'col-md-6' },
                        { name: "role", label: "Role", type: "text", className: 'col-md-6' },
                        { name: "status", label: "Status", type: "status-badge", className: 'col-md-6', 
                            badge: {
                                color:{'active': 'success', 'inactive': 'warning'}, 
                                label:{'active':'Active', 'inactive':'Inactive'}
                            }
                        },
                        { name: "created_at", label: "Created At", type: "date", className: 'col-md-6' },
                        { name: "updated_at", label: "Updated At", type: "date", className: 'col-md-6' },
                    ]
                },
                { 
                    label: 'Edit', type: 'edit', icon: 'edit-2', permission: "organization_people.update", title: "Edit Member",
                    modalClass: "modal-lg",
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
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/table/organizations',
                            }
                        },
                        { 
                            name: "position_id", label: "Position", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'label'},
                                url: appUrl + '/app/organizations/positions',
                                initList: {
                                    url: '/table/organization_positions',
                                    key: 'position_id',
                                    response: {id: 'id', text: 'name'},
                                },
                                urlParams: [
                                    {key: 'organization_id', value: 'organization_id'},
                                ]
                            }
                        },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "identity_number", label: "Identity Number", type: "text", className: 'col-md-6' },
                        { name: "first_name", label: "First Name", type: "text", className: 'col-md-6' },
                        { name: "last_name", label: "Last Name", type: "text", className: 'col-md-6' },
                        { name: "gender", label: "Gender", type: "select", options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}] },
                        { name: "birth_date", label: "Birth Date", type: "datePicker", className: 'col-md-6' },
                        { name: "birth_place", label: "Birth Place", type: "text", className: 'col-md-6' },
                        { name: "email", label: "Email", type: "text", className: 'col-md-6' },
                        { name: "phone", label: "Phone", type: "text", className: 'col-md-6' },
                        { name: "address", label: "Address", type: "textArea", className: 'col-md-12' },
                        { name: "city", label: "City", type: "text", className: 'col-md-6' },
                        { name: "state", label: "State", type: "text", className: 'col-md-6' },
                        { name: "postal_code", label: "Postal Code", type: "text", className: 'col-md-6' },
                        { name: "country", label: "Country", type: "text", className: 'col-md-6' },
                        { name: "start_date", label: "Start Date", type: "datePicker", className: 'col-md-6' },
                        { name: "end_date", label: "End Date", type: "datePicker", className: 'col-md-6' },
                        { name: "role", label: "Role", type: "text", className: 'col-md-6' },
                        { name: "status", label: "Status", type: "select", defaultValue: 'active', className: 'col-md-6', options: [
                            {label: 'Active', value: 'active'},
                            {label: 'Inactive', value: 'inactive'},
                        ] },
                    ]
                },
                { label: 'Delete', type: 'delete', icon: 'trash', class: 'text-danger', permission: "organization_people.delete"},
            ],
            search: { label: "Cari..."},

            columns: [
                { key: "full_name", label: "Full Name", sortable: true, searchable: true },
                { key: "code", label: "Code", sortable: true, searchable: true },
                { key: "organization_name", label: "Organization", sortable: true, searchable: true },
                { key: "position_name", label: "Position", sortable: true, searchable: true },
                { key: "identity_number", label: "Identity Number", sortable: true, searchable: true },
                { key: "gender", label: "Gender", type: "status-badge", sortable: true, searchable: true,
                    badge: {
                        color:{'male': 'info', 'female': 'warning'}, 
                        label:{'male':'Male', 'female':'Female'}
                    }
                },
                { key: "email", label: "Email", sortable: true, searchable: true },
                { key: "role", label: "Role", sortable: true, searchable: true },
                { key: "status", label: "Status", sortable: true, searchable: true, type: "status-badge", 
                    badge: {
                        color:{'active': 'success', 'inactive': 'warning', 'deceased': 'secondary', 'archived': 'danger'}, 
                        label:{'active':'Active', 'inactive':'Inactive', 'deceased': 'Deceased', 'archived': 'Archived'}
                    }
                },
            ],
            filters: [
                { key: "status", type: "options", label: "Status", placeholder: 'All Status', options: [
                    {label: 'Active', value: 'active'},
                    {label: 'Inactive', value: 'inactive'},
                ] },
            ]
        }
    }
}