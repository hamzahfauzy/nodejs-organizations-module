import menu from './config/menu.js'
import page from './config/page.js'
import organizations from './databases/model/organizations.js'
import organization_positions from './databases/model/organization_positions.js'
import organization_people from './databases/model/organization_people.js'
import { organizationRouter } from './config/router.js'

const tables = {
    organizations,
    organization_positions,
    organization_people
}

export default {
    // context {register, ui, db}
    init(context){
        // context.ui.appendChildToMenu('master', 'organizations', {
        //     label: 'Organizations',
        //     route: '/organizations',
        //     permission: "organizations.list",
        //     activeState:['/organizations', '/organization-positions','/organization-people'],
        // }, [
        //     'organizations.list',
        //     'organization_positions.list',
        //     'organization_people.list',
        // ], [
        //     '/organizations',
        //     '/organization-positions',
        //     '/organization-people',
        // ])
        
        for(const m in menu) {
            context.ui.registerMenu(m, menu[m])
        }

        for(const p in page) {
            context.ui.registerPage(p, page[p])
        }

        for(const t in tables){
            context.register.table(tables[t].name, tables[t])
        }

        context.register.migration('organizations', 'app/organizations/databases/migrations')

        context.register.route('organizations', organizationRouter)
    }
}