import { Link } from "react-router-dom";

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks &&
        tasks.map((task) => {
          const dueDate = new Date(task.dueDate);
          const formattedDueDate = dueDate
            .toLocaleString()
            .toString()
            .split(",");

          return (
            <div key={task._id} className="p-2 border m-2 rounded">
              <Link
                to={`/taskDetails/${task._id}`}
                className="link-secondary link-underline link-underline-opacity-0"
              >
                <div className="row">
                  <div className="col-md-4">Task: {task.name}</div>
                  <div className="col-md-4">
                    Due Date: {formattedDueDate[0]}
                  </div>
                  <div className="col-md-4">
                    Owners: {task.owners.map((owner) => owner.name).join(", ")}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      <div className="d-grid m-2">
        <Link to={"/addtask"} className="btn btn-outline-secondary text-dark">
          Add New Task
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
