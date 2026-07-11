import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/taskform.css";

function TaskForm({
    refreshTasks,
    editingTask,
    setEditingTask,
}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Low",
        due_date: "",
    });

    // Fill the form when editing a task
    useEffect(() => {
        if (editingTask) {
            setFormData({
                title: editingTask.title,
                description: editingTask.description,
                priority: editingTask.priority,
                due_date: editingTask.due_date,
            });
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTask) {
                // Update existing task
                await API.patch(
                    `tasks/${editingTask.id}/`,
                    formData
                );

                alert("Task Updated Successfully!");

                setEditingTask(null);

            } else {
                // Add new task
                await API.post("tasks/", formData);

                alert("Task Added Successfully!");
            }

            refreshTasks();

            // Clear form
            setFormData({
                title: "",
                description: "",
                priority: "Low",
                due_date: "",
            });

        } catch (error) {
            console.log(error);
            alert("Unable to save task.");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <h3>
                {editingTask ? "Edit Task" : "Add Task"}
            </h3>

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <br />
            <br />

            <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <br />
            <br />

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <br />
            <br />

            <input
    type="date"
    name="due_date"
    value={formData.due_date}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]}
/>

            <br />
            <br />

            <button type="submit">
                {editingTask ? "Update Task" : "Add Task"}
            </button>

            {editingTask && (
                <>
                    {" "}
                    <button
                        type="button"
                        onClick={() => {
                            setEditingTask(null);
                            setFormData({
                                title: "",
                                description: "",
                                priority: "Low",
                                due_date: "",
                            });
                        }}
                    >
                        Cancel
                    </button>
                </>
            )}

        </form>
    );
}

export default TaskForm;