import {Route, Routes, useLocation} from "react-router-dom";
import MasterPage from "../layout/masterpage/masterpage";
import Login from "../pages/Login/login";
import {Provider} from "react-redux";
import AdminPanel from "../pages/dashboard/admin/admin";
import Panel from "../pages/dashboard";
import NotFound from "../components/notFound/notFound";
import Content from "../layout/content/content";
import JobsContent from "../pages/JobContent/jobsContent";
import {persistor, store} from '../store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Logout from "../pages/Logout/logout";
import UserManagement from "../pages/dashboard/admin/users-management/userManagement";
import InterviewAssignment from "../pages/dashboard/admin/interview-assignment";
import ReportInterviewerSchedule from "../pages/dashboard/admin/report-interviewer/schedule";
import ReportInterviewerStatuses from "../pages/dashboard/admin/report-interviewer/status";
import {ReportIntervieweePersonality, ReportIntervieweePopulation} from "../pages/dashboard/admin/report-interviewee";
import Interviewer from "../pages/dashboard/interviewer/interviewer";
import InterviewerSchedule from "../pages/dashboard/interviewer/schedule";
import InterviewProfile from "../pages/dashboard/interviewee/profile";
import IntervieweeStatuses from "../pages/dashboard/interviewee/statuses";
import BigCalendar from "../components/ReactForm/BigCalendar/BigCalendar";
import CreateJob from "../pages/dashboard/admin/create-job";

const Routing = () => {
    const location = useLocation()
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Routes>
                        <Route path="/" element={<MasterPage/>}>
                            <Route path="/" element={<Content/>}/>
                            <Route path="jobContent" element={<JobsContent/>}/>
                        </Route>
                        <Route path="login" element={<Login/>}/>
                        <Route path="logout" element={<Logout/>}/>
                        <Route path="signIn" element={<Panel/>}>
                            <Route path="admin" element={<AdminPanel/>}/>
                            <Route path="admin/users-management" element={<UserManagement/>}/>
                            <Route path="admin/interview-assignment" element={<InterviewAssignment/>}/>
                            <Route path="admin/create-job" element={<CreateJob/>}/>
                            <Route path="admin/report-interviewer/schedule" element={<ReportInterviewerSchedule/>}/>
                            <Route path="admin/report-interviewer/statuses" element={<ReportInterviewerStatuses/>}/>
                            <Route path="admin/report-interviewee/personality" element={<ReportIntervieweePersonality />}/>
                            <Route path="admin/report-interviewee/population" element={<ReportIntervieweePopulation/>}/>

                            <Route path="interviewee" element={<div></div>}/>
                            <Route path="interviewee/profile" element={<InterviewProfile/>}/>
                            <Route path="interviewee/status" element={<IntervieweeStatuses/>} />

                            <Route path="interviewer" element={<Interviewer/>}/>
                            <Route path="interviewer/schedule" element={<InterviewerSchedule/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </PersistGate>
            </Provider>
        </>
    )
}
export default Routing;