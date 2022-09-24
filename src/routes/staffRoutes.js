import AddCAResult from "../component/staff/AddCAResult";
import AddComments from "../component/staff/AddComments";
import AddStudentResult from "../component/staff/AddStudentResult";
import Assignment from "../component/staff/Assignment";
import AssignmentSubmission from "../component/staff/AssignmentSubmission";
import Attendance from "../component/staff/Attendance";
import CAResult from "../component/staff/CAResult";
import CheckViewResult from "../component/staff/CheckViewResult";
import Comment from "../component/staff/Comment";
import Dashboardpage from "../component/staff/dashboard/Dashboardpage";
import EnterCAResult from "../component/staff/EnterCAResult";
import EnterStudentResult from "../component/staff/EnterStudentResult";
import MarkAttendance from "../component/staff/MarkAttendance";
import ComposeMessage from "../component/staff/messagebox/ComposeMessage";
import MessageInbox from "../component/staff/messagebox/MessageInbox";
import ReadMessage from "../component/staff/messagebox/ReadMessage";
import MyStudent from "../component/staff/MyStudent";
import PostAssignment from "../component/staff/PostAssignment";
import PrintStudentResult from "../component/staff/PrintStudentResult";
import ProcessResultPosition from "../component/staff/ProcessResultPosition";
import MyProfile from "../component/staff/profile/MyProfile";
import PsychomotorDomain from "../component/staff/PsychomotorDomain";
import PsychomotorPost from "../component/staff/PsychomotorPost";
import PsychomotorStart from "../component/staff/PsychomotorStart";
import PsychomotorView from "../component/staff/PsychomotorView";
import Result from "../component/staff/Result";
import ResultSingleEntry from "../component/staff/ResultSingleEntry";
import SingleCAResult from "../component/staff/SingleCAResult";
import StartComment from "../component/staff/StartComment";
import StartMarkAttendnace from "../component/staff/StartMarkAttendnace";
import UploadResult from "../component/staff/UploadResult";
import ViewAssignment from "../component/staff/ViewAssignment";
import ViewAttendance from "../component/staff/ViewAttendance";
import ViewCAResult from "../component/staff/ViewCAResult";
import ViewComments from "../component/staff/ViewComments";
import ViewResultDetails from "../component/staff/ViewResultDetails";
import ViewStudent from "../component/staff/ViewStudent";

const staff_routes = [
    { path: '/staff', exact: true, name: 'Staff' },
    { path: '/staff/index', exact: true, name: 'Dashboardpage', component: Dashboardpage },
    { path: '/staff/student', exact: true, name: 'MyStudent', component: MyStudent },
    { path: '/staff/view-student/:id', exact: true, name: 'ViewStudent', component: ViewStudent },
    { path: '/staff/result', exact: true, name: 'Result', component: Result },
    { path: '/staff/view-result/:id', exact: true, name: 'ViewResultDetails', component: ViewResultDetails },
    { path: '/staff/enter-result', exact: true, name: 'EnterStudentResult', component: EnterStudentResult },
    { path: '/staff/subject-position', exact: true, name: 'ProcessResultPosition', component: ProcessResultPosition },
    { path: '/staff/add-result', exact: true, name: 'AddStudentResult', component: AddStudentResult },
    { path: '/staff/result-single', exact: true, name: 'ResultSingleEntry', component: ResultSingleEntry },
    { path: '/staff/manage-upload', exact: true, name: 'UploadResult', component: UploadResult },
    { path: '/staff/ca-result', exact: true, name: 'CAResult', component: CAResult },
    { path: '/staff/view-cadetails/:id', exact: true, name: 'ViewCAResult', component: ViewCAResult },
    { path: '/staff/enter-ca', exact: true, name: 'EnterCAResult', component: EnterCAResult },
    { path: '/staff/add-ca', exact: true, name: 'AddCAResult', component: AddCAResult },
    { path: '/staff/single-ca', exact: true, name: 'SingleCAResult', component: SingleCAResult },
    { path: '/staff/add-assignment', exact: true, name: 'PostAssignment', component: PostAssignment },
    { path: '/staff/assignment', exact: true, name: 'Assignment', component: Assignment },
    { path: '/staff/view-assignment/:id', exact: true, name: 'ViewAssignment', component: ViewAssignment },
    { path: '/staff/attendance', exact: true, name: 'Attendance', component: Attendance },
    { path: '/staff/mark-attendance', exact: true, name: 'StartMarkAttendance', component: StartMarkAttendnace },
    { path: '/staff/post-attendance', exact: true, name: 'MarkAttendance', component: MarkAttendance },
    { path: '/staff/view-attendance/:id', exact: true, name: 'ViewAttendance', component: ViewAttendance },
    { path: '/staff/my-psychomotor', exact: true, name: 'PsychomotorDomain', component: PsychomotorDomain },
    { path: '/staff/start-psychomotor', exact: true, name: 'PsychomotorStart', component: PsychomotorStart },
    { path: '/staff/view-psychomotor/:id', exact: true, name: 'PsychomotorView', component: PsychomotorView },
    { path: '/staff/post-psychomotor', exact: true, name: 'PsychomotorPost', component: PsychomotorPost },
    { path: '/staff/comment', exact: true, name: 'Comment', component: Comment },
    { path: '/staff/enter-comment', exact: true, name: 'StartComment', component: StartComment },
    { path: '/staff/view-allcomments/:id', exact: true, name: 'ViewComments', component: ViewComments },
    { path: '/staff/post-comment', exact: true, name: 'AddComments', component: AddComments },
    { path: '/staff/message', exact: true, name: 'MessageInbox', component: MessageInbox },
    { path: '/staff/profile', exact: true, name: 'MyProfile', component: MyProfile },
    { path: '/staff/send-message', exact: true, name: 'ComposeMessage', component: ComposeMessage },
    { path: '/staff/submission', exact: true, name: 'AssignmentSubmission', component: AssignmentSubmission },
    { path: '/staff/read-message/:id', exact: true, name: 'ReadMessage', component: ReadMessage },
    { path: '/staff/student-result', exact: true, name: 'PrintStudentResult', component: PrintStudentResult },
    { path: '/staff/check-result/:id', exact: true, name: 'CheckViewResult', component: CheckViewResult },



]


export default staff_routes;