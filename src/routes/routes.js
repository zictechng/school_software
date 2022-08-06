
import Profile from '../component/admin/Profile';
import Contact from '../component/admin/Contact';
import Dashboardpage from '../component/admin/dashboard/Dashboardpage';
import Class from '../component/admin/settup_class/Class';
import Subjects from '../component/admin/subjects/Subjects';
import AcademicSession from '../component/admin/AcademicSession';
import AcademicTerm from '../component/admin/AcademicTerm';
import SchoolCategory from '../component/admin/SchoolCategory';
import SchoolResuption from '../component/admin/SchoolResuption';
import SchoolopenDays from '../component/admin/SchoolopenDays';
import CurrentSession from '../component/admin/CurrentSession';
import AllStudent from '../component/admin/student/AllStudent';
import AddStudent from '../component/admin/student/AddStudent';
import EditStudent from '../component/admin/student/EditStudent';
import ViewStudent from '../component/admin/student/ViewStudent';
import SaveText from '../component/admin/SaveText';
import AllStaff from '../component/admin/staffdata/AllStaff';
import AddStaff from '../component/admin/staffdata/AddStaff';
import EditStaff from '../component/admin/staffdata/EditStaff';
import ViewStaff from '../component/admin/staffdata/ViewStaff';
import AdminUsers from '../component/admin/staffdata/AdminUsers';
import AddAdminUser from '../component/admin/staffdata/AddAdminUser';
import EditAdmin from '../component/admin/staffdata/EditAdmin';
import AddResult from '../component/admin/resultmodule/AddResult';
import StudentResultProcess from '../component/admin/resultmodule/StudentResultProcess';
import EnterResult from '../component/admin/resultmodule/EnterResult';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/index', exact: true, name: 'Dashboardpage', component: Dashboardpage },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/admin/class', exact: true, name: 'Class', component: Class },
    { path: '/admin/subject', exact: true, name: 'Subjects', component: Subjects },
    { path: '/admin/academic-session', exact: true, name: 'AcademicSession', component: AcademicSession },
    { path: '/admin/term', exact: true, name: 'AcademicTerm', component: AcademicTerm },
    { path: '/admin/school-category', exact: true, name: 'SchoolCategory', component: SchoolCategory },
    { path: '/admin/school-resumption', exact: true, name: 'SchoolResuption', component: SchoolResuption },
    { path: '/admin/days-open', exact: true, name: 'SchoolopenDays', component: SchoolopenDays },
    { path: '/admin/current-session', exact: true, name: 'CurrentSession', component: CurrentSession },
    { path: '/admin/student', exact: true, name: 'AllStudent', component: AllStudent },
    { path: '/admin/add-student', exact: true, name: 'AddStudent', component: AddStudent },
    { path: '/admin/add-student', exact: true, name: 'AddStudent', component: AddStudent },
    { path: '/admin/edit-student/:id', exact: true, name: 'EditStudent', component: EditStudent },
    { path: '/admin/view-student/:id', exact: true, name: 'ViewStudent', component: ViewStudent },
    { path: '/admin/save-text', exact: true, name: 'SaveText', component: SaveText },
    { path: '/admin/staff', exact: true, name: 'AllStaff', component: AllStaff },
    { path: '/admin/add-staff', exact: true, name: 'AddStaff', component: AddStaff },
    { path: '/admin/edit-staff/:id', exact: true, name: 'EditStaff', component: EditStaff },
    { path: '/admin/view-staff/:id', exact: true, name: 'ViewStaff', component: ViewStaff },
    { path: '/admin/admin-user', exact: true, name: 'AdminUsers', component: AdminUsers },
    { path: '/admin/add-admin', exact: true, name: 'AddAdminUser', component: AddAdminUser },
    { path: '/admin/edit-admin/:id', exact: true, name: 'EditAdmin', component: EditAdmin },
    { path: '/admin/result', exact: true, name: 'AddResult', component: AddResult },
    { path: '/admin/result-process', exact: true, name: 'StudentResultProcess', component: StudentResultProcess },
    { path: '/admin/enter-result', exact: true, name: 'EnterResult', component: EnterResult },


]


export default routes;