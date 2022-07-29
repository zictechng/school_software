import Profile from '../component/admin/Profile';
import Contact from '../component/admin/Contact';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/contact', exact: true, name: 'Contact', component: Contact },

]


export default routes;