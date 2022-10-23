export const AdminPanel = [
    {id: 1, title: "مصاحبه شوندگان", name: "", link: "admin/users-management", icon: "mdi mdi-account-group", role: ""},
    {id: 2, title: "تخصیص مصاحبه", name: "", link: "admin/interview-assignment", icon: "mdi mdi-connection", role: ""},
    {id: 3, title: "افزودن شغل", name: "", link: "admin/create-job", icon: "fa fa-briefcase", role: ""},
    {
        id: 3, title: "گزاشات مصاحبه کنندگان", name: "", icon: "mdi mdi-clipboard-text-clock-outline", status: "", items: [
            {id: 1, link: "admin/report-interviewer/schedule", icon: "", title: "جدول زمان بندی"},
            {id: 2, link: "admin/report-interviewer/statuses", icon: "", title: "جدول وضعیت"},
        ], role: ""
    },
    {
        id: 4, title: "گزارشات مصاحبه شوندگان", name: "", icon: "mdi mdi-file-chart-outline", status: "", items: [
            {id: 1, link: "admin/report-interviewee/personality", icon: "", title: "وضعیت جذب نیرو"},
            {id: 2, link: "admin/report-interviewee/population", icon: "", title: "وضعیت جذب"},
        ], role: ""
    }
]
export const IntervieweePanel = [
    {id: 1, title: "پروفایل", name: "", link: "interviewee/profile", icon: "mdi mdi-form-select", role: ""},
    {id: 2, title: "وضعیت", name: "", link: "interviewee/status", icon: "mdi mdi-list-status", role: ""},
]
export const InterviewerPanel = [
    {id: 1, title: "جدول زمانبندی", name: "", link: "interviewer/schedule", icon: "mdi mdi-table-clock", role: ""},
]