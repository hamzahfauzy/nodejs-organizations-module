const appUrl = process.env.APP_URL
export default {
    title: "Organizations",
    path: "organizations/lists",
    permission: "organizations.list",

    content: {
        type: "crud",
        value: {

            endpoint: "/table/organizations",

            create: {
                label: "Create",
                icon: "plus",
                permission: "organizations.create",
                title: "Create Organization",
                modalClass: "modal-lg",

                fields: [
                    { 
                        name: "parent_id", label: "Parent", type: "select2",
                        dropdownParent: '#create-modal',
                        ajax: {
                            useBearer: true,
                            term: 'search',
                            response: {id: 'id', text: 'label'},
                            url: appUrl + '/app/organizations/parent-lists',
                        }
                    },
                    { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                    { name: "type", label: "Type", type: "text", className: 'col-md-6' },
                    { name: "name", label: "Name", type: "text" },
                    { name: "phone", label: "Phone", type: "text", className: 'col-md-6' },
                    { name: "email", label: "Email", type: "text" , className: 'col-md-6'},
                    { name: "is_workspace", label: "Is Workspace", type: "select", defaultValue: '0', options: [
                        { label: "No", value: 0 },
                        { label: "Yes", value: 1 }
                    ]},
                    { name: "description", label: "Description", type: "textArea" },
                    { name: "address", label: "Address", type: "textArea" },
                    { name: "status", label: "Status", type: "select", defaultValue: 'active', options: [
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                        { label: "Archived", value: "archived" }
                    ]},
                    { name: "start_date", label: "Start Date", type: "datePicker", className: 'col-md-6' },
                    { name: "end_date", label: "End Date", type: "datePicker", className: 'col-md-6' },
                ]
            },

            actions: [
                {
                    label: 'Positions', icon: 'eye', type: 'link', 
                    to: {path: '/page/organization-positions', query: {filters: {organization_id: 'id'}}}, 
                    permission: 'organization_positions.list'
                },
                {
                    label: 'Member', icon: 'eye', type: 'link', 
                    to: {path: '/page/organization-people', query: {filters: {organization_id: 'id'}}}, 
                    permission: 'organization_people.list'
                },
                { 
                    label: 'Detail', type: 'view', icon: 'eye', permission: "organizations.single", title: 'Organization Detail',
                    fields: [
                        { name: "parent_name", label: "Parent", type: "text", className: 'col-md-6' },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "name", label: "Name", type: "text" },
                        { name: "phone", label: "Phone", type: "text", className: 'col-md-6' },
                        { name: "email", label: "Email", type: "text", className: 'col-md-6' },
                        { name: "is_workspace", label: "Is Workspace", type: "status-badge", 
                            badge: {
                                color:{'0': 'warning', '1': 'success'}, 
                                label:{'0':'No', '1':'Yes'}
                            },
                            className: 'col-md-6' 
                        },
                        { name: "type", label: "Type", type: "text", className: 'col-md-6' },
                        // { name: "level", label: "Level", type: "text", className: 'col-md-6' },
                        { name: "description", label: "Description", type: "text" },
                        { name: "start_date", label: "Start Date", type: "text", className: 'col-md-6' },
                        { name: "end_date", label: "End Date", type: "text", className: 'col-md-6' },
                        { name: "status", label: "Status", type: "status-badge", 
                            badge: {
                                color:{'active': 'success', 'inactive': 'warning', 'deceased': 'secondary', 'archived': 'danger'}, 
                                label:{'active':'Active', 'inactive':'Inactive', 'deceased': 'Deceased', 'archived': 'Archived'}
                            }
                        },
                        // { name: "metadata", label: "Metadata", type: "object" },
                        { name: "created_at", label: "Created At", type: "date", className: 'col-md-6' },
                        { name: "updated_at", label: "Updated At", type: "date", className: 'col-md-6' },
                    ]
                },
                {
                    label: "Edit",
                    type: "edit",
                    icon: "edit-2",
                    permission: "organizations.update",
                    title: "Edit Organization",
                    modalClass: "modal-lg",

                    fields: [
                        { 
                            name: "parent_id", label: "Parent", type: "select2",
                            dropdownParent: '#edit-modal',
                            ajax: {
                                useBearer: true,
                                term: 'search',
                                response: {id: 'id', text: 'label'},
                                initList: {
                                    url: '/table/organizations',
                                    key: 'parent_id',
                                    response: {id: 'id', text: 'name'},
                                },
                                url: appUrl + '/app/organizations/parent-lists',
                                urlParams: [{key: 'id', value: 'id'}]
                            }
                        },
                        { name: "code", label: "Code", type: "text", className: 'col-md-6' },
                        { name: "type", label: "Type", type: "text", className: 'col-md-6' },
                        { name: "name", label: "Name", type: "text" },
                        { name: "phone", label: "Phone", type: "text", className: 'col-md-6' },
                        { name: "email", label: "Email", type: "text" , className: 'col-md-6'},
                        { name: "is_workspace", label: "Is Workspace", type: "select", defaultValue: '0', options: [
                            { label: "No", value: 0 },
                            { label: "Yes", value: 1 }
                        ]},
                        { name: "description", label: "Description", type: "textArea" },
                        { name: "address", label: "Address", type: "textArea" },
                        { name: "status", label: "Status", type: "select", options: [
                            { label: "Active", value: "active" },
                            { label: "Inactive", value: "inactive" },
                            { label: "Archived", value: "archived" }
                        ]},
                        { name: "start_date", label: "Start Date", type: "datePicker", className: 'col-md-6' },
                        { name: "end_date", label: "End Date", type: "datePicker", className: 'col-md-6' },
                    ]
                },

                {
                    label: "Delete",
                    type: "delete",
                    icon: "trash",
                    class: "text-danger",
                    permission: "organizations.delete"
                }
            ],

            columns: [
                { key: "code", label: "Code", sortable: true, searchable: true },
                { key: "name", label: "Name", sortable: true, searchable: true },
                { key: "parent_name", label: "Parent", sortable: true },
                { key: "type", label: "Type", sortable: true, searchable: true },
                { 
                    key: "status", label: "Status", sortable: true, searchable: true,
                    type: "status-badge", 
                    badge: {
                        color:{'active': 'success', 'inactive': 'danger', 'archived': 'warning'}, 
                        label:{'active':'Active', 'inactive':'Inactive', 'archived': 'Archived'}
                    }
                },
                { 
                    key: "is_workspace", label: "Workspace", sortable: true, searchable: true,
                    type: "status-badge", 
                    badge: {
                        color:{'1': 'success', '0': 'warning'}, 
                        label:{'1':'Yes', '0':'No'}
                    }
                },
                { key: "created_at", label: "Created At", sortable: true, type: "date" },
                { key: "updated_at", label: "Updated At", sortable: true, type: "date" }
            ]

        }
    }
}