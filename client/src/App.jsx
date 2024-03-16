import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FrappeGantt } from "frappe-gantt-react";

function App() {

  let d1 = new Date();
  let d2 = new Date();
  d2.setDate(d2.getDate() + 5);
  let d3 = new Date();
  d3.setDate(d3.getDate() + 8);
  let d4 = new Date();
  d4.setDate(d4.getDate() + 20);
  
  const tasks = [
    {
      id: "Task 1",
      name: "Task 1",
      start: d1,
      end: d2,
      progress: 10,
      dependencies: ""
    },
    {
      id: "Task 2",
      name: "Task 2",
      start: d3,
      end: d4,
      progress: null,
      dependencies: "Task 1"
    },
    {
      id: "Task 3",
      name: "Redesign website",
      start: new Date(),
      end: d4,
      progress: 0,
      dependencies: "Task 2, Task 1"
    }
  ]

  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
      <FrappeGantt
        tasks={tasks}
        viewMode={"Month"}
        onClick={task => console.log(task, "click")}
        onDateChange={(task, start, end) =>
          console.log(task, start, end, "date")
        }
        onProgressChange={(task, progress) =>
          console.log(task, progress, "progress")
        }
        onTasksChange={tasks => console.log(tasks, "tasks")}
      />
      abc
    </div>
  );
};
export default App;
