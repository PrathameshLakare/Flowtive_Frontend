import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import projectSlice from "../features/project/projectSlice";
import taskSlice from "../features/task/taskSlice";
import teamSlice from "../features/team/teamSlice";
import userSlice from "../features/owners/userSlice";
import tagSlice from "../features/tag/tagSlice";
import reportSlice from "../features/report/reportSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    project: projectSlice,
    task: taskSlice,
    team: teamSlice,
    users: userSlice,
    tag: tagSlice,
    report: reportSlice,
  },
});
