import { useEffect, useState } from "react";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import "../styles/dashboard.css";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const percentage =
        tasks.length > 0
            ? Math.round((completedTasks / tasks.length) * 100)
            : 0;

    const fetchTasks = async (status = filter) => {
        try {
            let url = "tasks/";

            if (status === "completed") {
                url = "tasks/?status=completed";
            } else if (status === "pending") {
                url = "tasks/?status=pending";
            }

            const response = await API.get(url);

            setTasks(response.data);
            setFilter(status);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className="dashboard">

            <Navbar />

            <div className="dashboard-content">

                {/* Left Side */}

                <div className="left-panel">

                    <TaskForm
                        refreshTasks={fetchTasks}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                    />

                </div>

                {/* Right Side */}

                <div className="right-panel">

                    <h3>Task Progress</h3>

                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${percentage}%` }}
                        ></div>
                    </div>

                    <p className="progress-text">
                        {completedTasks} of {tasks.length} Tasks Completed ({percentage}%)
                    </p>
                        <input
    type="text"
    placeholder="🔍 Search task..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-box"
/>
                    <div className="filters">

                        <button onClick={() => fetchTasks("all")}>
                            All
                        </button>

                        <button onClick={() => fetchTasks("completed")}>
                            Completed
                        </button>

                        <button onClick={() => fetchTasks("pending")}>
                            Pending
                        </button>

                    </div>

                    <TaskList
                        tasks={filteredTasks}
                        refreshTasks={fetchTasks}
                        setEditingTask={setEditingTask}
                    />

                </div>

            </div>

        </div>
    );
}

export default Dashboard;