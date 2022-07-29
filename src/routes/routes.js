
import Profile from '../component/admin/Profile';
import Contact from '../component/admin/Contact';
import Dashboardpage from '../component/admin/dashboard/Dashboardpage';
import Class from '../component/admin/settup_class/Class';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/index', exact: true, name: 'Dashboardpage', component: Dashboardpage },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/admin/class', exact: true, name: 'Class', component: Class },


]


export default routes;