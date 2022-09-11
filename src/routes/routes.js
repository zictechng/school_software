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
import AddResult3 from '../component/admin/resultmodule/AddResult3';
import StudentResultProcess from '../component/admin/resultmodule/StudentResultProcess';
import EnterResult from '../component/admin/resultmodule/EnterResult';
import SingleResult from '../component/admin/resultmodule/SingleResult';
import DynamicInput from '../component/admin/resultmodule/DynamicInput';
import CAResult from '../component/admin/resultmodule/CAResult';
import EnterCA from '../component/admin/resultmodule/EnterCA';
import ViewResult from '../component/admin/resultmodule/ViewResult';
import ResultView from '../component/admin/resultmodule/ResultView';
import SubjectResultView from '../component/admin/resultmodule/SubjectResultView';
import SingleCA from '../component/admin/resultmodule/SingleCA';
import GradeClassResult from '../component/admin/maintainresult/GradeClassResult';
import RepairResult from '../component/admin/maintainresult/RepairResult';
import RepairClassPosition from '../component/admin/maintainresult/RepairClassPosition';
import RepairSubject from '../component/admin/maintainresult/RepairSubject';
import TrashCAResult from '../component/admin/maintainresult/TrashCAResult';
import RepairView from '../component/admin/maintainresult/RepairView';
import RepairCAView from '../component/admin/maintainresult/RepairCAView';
import GradeView from '../component/admin/maintainresult/GradeView';
import SaveMultiple from '../component/admin/SaveMultiple';
import ManagePromotion from '../component/admin/manage_extra/ManagePromotion';
import PromotionView from '../component/admin/manage_extra/PromotionView';
import PromotionReturned from '../component/admin/manage_extra/PromotionReturned';
import Graduation from '../component/admin/manage_extra/Graduation';
import GraduationView from '../component/admin/manage_extra/GraduationView';
import Attendance from '../component/admin/manage_extra/Attendance';
import AttendanceView from '../component/admin/manage_extra/AttendanceView';
import ViewAttendance from '../component/admin/manage_extra/ViewAttendance';
import ResultTemplate from '../component/admin/manage_extra/ResultTemplate';
import TimeTable from '../component/admin/manage_extra/TimeTable';
import Broadsheet from '../component/admin/manage_extra/Broadsheet';
import GeneratePin from '../component/admin/manage_extra/GeneratePin';
import ViewPin from '../component/admin/manage_extra/ViewPin';
import AssignedSubject from '../component/admin/manage_extra/AssignedSubject';
import ViewAssignSubject from '../component/admin/manage_extra/ViewAssignSubject';
import AssignClass from '../component/admin/manage_extra/AssignClass';
import ViewAssignClass from '../component/admin/manage_extra/ViewAssignClass';
import PsychomotorDomain from '../component/admin/manage_extra/PsychomotorDomain';
import EnterPsychomotorDomain from '../component/admin/manage_extra/EnterPsychomotorDomain';
import ViewPsychomotorDomain from '../component/admin/manage_extra/ViewPsychomotorDomain';
import SystemLog from '../component/SystemLog';
import ManageUpload from '../component/admin/resultmodule/ManageUpload';
import ManageUpload2 from '../component/admin/resultmodule/ManageUpload2';
import PositionView from '../component/admin/maintainresult/PositionView';
import PrincipleComment from '../component/admin/manage_extra/PrincipleComment';
import EnterComment from '../component/admin/manage_extra/EnterComment';
import ViewResultPosition from '../component/admin/resultmodule/ViewResultPosition';
import ViewSubjects from '../component/admin/resultmodule/ViewSubjects';
import ViewCommentDetails from '../component/admin/manage_extra/ViewCommentDetails';
import ViewGradeDetails from '../component/admin/maintainresult/ViewGradeDetails';
import ViewCADetails from '../component/admin/resultmodule/ViewCADetails';
import TestCode from '../component/admin/TestCode';
import ResultPrintPage from '../component/admin/resultmodule/ResultPrintPage';
import SaveText1 from '../component/SaveTest1';


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
    { path: '/admin/single-result', exact: true, name: 'SingleResult', component: SingleResult },
    { path: '/admin/dynamic-input', exact: true, name: 'DynamicInput', component: DynamicInput },
    { path: '/admin/ca-result', exact: true, name: 'CAResult', component: CAResult },
    { path: '/admin/enter-ca', exact: true, name: 'EnterCA', component: EnterCA },
    { path: '/admin/view-result', exact: true, name: 'ViewResult', component: ViewResult },
    { path: '/admin/result-view', exact: true, name: 'ResultView', component: ResultView },
    { path: '/admin/result-subject', exact: true, name: 'SubjectResultView', component: SubjectResultView },
    { path: '/admin/single-ca', exact: true, name: 'SingleCA', component: SingleCA },
    { path: '/admin/grade-result', exact: true, name: 'GradeClassResult', component: GradeClassResult },
    { path: '/admin/repair-result', exact: true, name: 'RepairResult', component: RepairResult },
    { path: '/admin/repair-position', exact: true, name: 'RepairClassPosition', component: RepairClassPosition },
    { path: '/admin/repair-subject', exact: true, name: 'RepairSubject', component: RepairSubject },
    { path: '/admin/trash-ca', exact: true, name: 'TrashCAResult', component: TrashCAResult },
    { path: '/admin/repair-view', exact: true, name: 'RepairView', component: RepairView },
    { path: '/admin/repair-ca', exact: true, name: 'RepairCAView', component: RepairCAView },
    { path: '/admin/grade_view', exact: true, name: 'GradeView', component: GradeView },
    { path: '/admin/result2', exact: true, name: 'AddResult3', component: AddResult3 },
    { path: '/admin/save-multiple', exact: true, name: 'SaveMultiple', component: SaveMultiple },
    { path: '/admin/manage-promotion', exact: true, name: 'ManagePromotion', component: ManagePromotion },
    { path: '/admin/promotion-view', exact: true, name: 'PromotionView', component: PromotionView },
    { path: '/admin/returned-promotion', exact: true, name: 'PromotionReturned', component: PromotionReturned },
    { path: '/admin/graduation', exact: true, name: 'Graduation', component: Graduation },
    { path: '/admin/graduation-view', exact: true, name: 'GraduationView', component: GraduationView },
    { path: '/admin/attendance', exact: true, name: 'Attendance', component: Attendance },
    { path: '/admin/attendance-view', exact: true, name: 'AttendanceView', component: AttendanceView },
    { path: '/admin/view-attendance/:id', exact: true, name: 'ViewAttendance', component: ViewAttendance },
    { path: '/admin/result-template', exact: true, name: 'ResultTemplate', component: ResultTemplate },
    { path: '/admin/time-table', exact: true, name: 'TimeTable', component: TimeTable },
    { path: '/admin/broad-sheet', exact: true, name: 'BroadSheet', component: Broadsheet },
    { path: '/admin/generate-pin', exact: true, name: 'GeneratePin', component: GeneratePin },
    { path: '/admin/view-pins/:id', exact: true, name: 'ViewPin', component: ViewPin },
    { path: '/admin/assign-subject', exact: true, name: 'AssignedSubject', component: AssignedSubject },
    { path: '/admin/view-assignsubjects/:id', exact: true, name: 'ViewAssignSubject', component: ViewAssignSubject },
    { path: '/admin/assign-class', exact: true, name: 'AssignClass', component: AssignClass },
    { path: '/admin/view-assignclass/:id', exact: true, name: 'ViewAssignClass', component: ViewAssignClass },
    { path: '/admin/psychomotor', exact: true, name: 'PsychomotorDomain', component: PsychomotorDomain },
    { path: '/admin/enter-psychomotor', exact: true, name: 'EnterPsychomotorDomain', component: EnterPsychomotorDomain },
    { path: '/admin/view-psychomotor/:id', exact: true, name: 'ViewPsychomotorDomain', component: ViewPsychomotorDomain },
    { path: '/admin/system-logs', exact: true, name: 'SystemLog', component: SystemLog },
    { path: '/admin/manage-upload', exact: true, name: 'ManageUpload', component: ManageUpload },
    { path: '/admin/manage-upload2', exact: true, name: 'ManageUpload2', component: ManageUpload2 },
    { path: '/admin/position-view', exact: true, name: 'PositionView', component: PositionView },
    { path: '/admin/comments', exact: true, name: 'PrincipleComment', component: PrincipleComment },
    { path: '/admin/enter-comment', exact: true, name: 'EnterComment', component: EnterComment },
    { path: '/admin/view-position', exact: true, name: 'ViewResultPosition', component: ViewResultPosition },
    { path: '/admin/view-subjects/:id', exact: true, name: 'ViewSubjects', component: ViewSubjects },
    { path: '/admin/view-comments/:id', exact: true, name: 'ViewCommentDetails', component: ViewCommentDetails },
    { path: '/admin/view-grade/:id', exact: true, name: 'ViewGradeDetails', component: ViewGradeDetails },
    { path: '/admin/view-ca/:id', exact: true, name: 'ViewCADetails', component: ViewCADetails },
    { path: '/admin/text-code', exact: true, name: 'TestCode', component: TestCode },
    { path: '/admin/print-sheet', exact: true, name: 'ResultPrintPage', component: ResultPrintPage },
    { path: '/admin/save-test1', exact: true, name: 'SaveText1', component: SaveText1 },


]


export default routes;