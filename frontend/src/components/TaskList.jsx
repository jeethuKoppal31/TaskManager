import TaskItem from "./TaskItem";

function TaskList({ tasks, refreshTasks, setEditingTask }) {

    return (
        <div>

            <h3>Your Tasks</h3>

            {tasks.length === 0 ? (
                <p>No Tasks Found.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        refreshTasks={refreshTasks}
                        setEditingTask={setEditingTask}
                    />
                ))
            )}

        </div>
    );
}

export default TaskList;