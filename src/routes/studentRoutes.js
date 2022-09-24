import Assignment from "../component/student/Assignment";
import StudentDashboardPage from "../component/student/dashboard/StudentDashboardPage";
import MyProfile from "../component/student/MyProfile";
import NotificationInbox from "../component/student/NotificationInbox";
import ReadNotification from "../component/student/ReadNotification";
import ResultChecker from "../component/student/ResultChecker";
import SubmitAssignment from "../component/student/SubmitAssignment";
import SupportTicket from "../component/student/SupportTicket";
import TestResultChecker from "../component/student/TestResultChecker";
import UpdatePassword from "../component/student/UpdatePassword";
import ViewAssignment from "../component/student/ViewAssignment";


const student_routes = [
    { path: '/student', exact: true, name: 'Student' },
    { path: '/student/index', exact: true, name: 'StudentDashboardPage', component: StudentDashboardPage },
    { path: '/student/profile', exact: true, name: 'MyProfile', component: MyProfile },
    { path: '/student/setting', exact: true, name: 'UpdatePassword', component: UpdatePassword },
    { path: '/student/notifications', exact: true, name: 'NotificationInbox', component: NotificationInbox },
    { path: '/student/read-notification/:id', exact: true, name: 'ReadNotification', component: ReadNotification },
    { path: '/student/support', exact: true, name: 'SupportTicket', component: SupportTicket },
    { path: '/student/assignment', exact: true, name: 'Assignment', component: Assignment },
    { path: '/student/view-assignment/:id', exact: true, name: 'ViewAssignment', component: ViewAssignment },
    { path: '/student/submit-assignment/:id', exact: true, name: 'SubmitAssignment', component: SubmitAssignment },
    { path: '/student/result-checker', exact: true, name: 'ResultChecker', component: ResultChecker },
    { path: '/student/ca-checker', exact: true, name: 'TestResultChecker', component: TestResultChecker },




]


export default student_routes;