import ReportTaskClosedByTeam from "./ReportTaskClosedByTeam";
import ReportLastWeek from "./ReportLastWeek";
import ReportPendingTime from "./ReportPendingTasks";
import ReportTaskClosedByProject from "./ReportTaskClosedByProject";
import ReportTaskClosedByOwner from "./ReportTaskClosedByOwner";
import { useSelector } from "react-redux";

const ReportView = () => {
  const { status, error } = useSelector((state) => state.report);
  return (
    <div className="container">
      <div className="pb-3">
        <h1 className="text-center display-4">Flowtive Report</h1>
        <h2 className="text-center">Report Overview</h2>
      </div>
      {status === "loading" && <p className="text-center my-2">Loading...</p>}
      {status === "error" && <p className="text-center my-2">{error}</p>}
      <ReportLastWeek />
      <ReportPendingTime />
      <div className="row">
        <div className="col-lg-6">
          <ReportTaskClosedByTeam />
        </div>
        <div className="col-lg-6">
          <ReportTaskClosedByProject />
        </div>
      </div>
      <ReportTaskClosedByOwner />
    </div>
  );
};

export default ReportView;
