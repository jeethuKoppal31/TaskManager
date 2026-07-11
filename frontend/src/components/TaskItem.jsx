import API from "../api/axios";
import "../styles/taskitem.css";

function TaskItem({ task, refreshTasks, setEditingTask }) {

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`tasks/${task.id}/`);

            alert("Task Deleted Successfully!");

            refreshTasks();

        } catch (error) {

            console.log(error);

            alert("Unable to delete task.");

        }

    };

    const handleComplete = async () => {

        try {

            await API.patch(`tasks/${task.id}/`, {
                completed: !task.completed,
            });

            refreshTasks();

        } catch (error) {

            console.log(error);

            alert("Unable to update task.");

        }

    };

    return (

        <div className="task-card">

            <div className="task-left">

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <p>
    <strong>Priority:</strong>

    <span
        className={
            task.priority === "High"
                ? "priority-high"
                : task.priority === "Medium"
                ? "priority-medium"
                : "priority-low"
        }
    >
        {task.priority}
    </span>

</p>

                <p>
                    <strong>Due Date:</strong> {task.due_date}
                </p>

            </div>

            <div className="task-right">

                <label className="completed-label">

                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={handleComplete}
                    />

                    {" "}Completed

                </label>

                <div className="task-buttons">

                    <button
                        className="edit-btn"
                        onClick={() => setEditingTask(task)}
                    >
                        ✏ Edit
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        🗑 Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default TaskItem;