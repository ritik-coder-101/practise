import React, {useState} from "react";

interface Task {
    id :number,
    task : String,
    complete : boolean,
}

function Todo() {
    const [todo,setTodo] =useState<Task[]>([]);
    const [task,setTask]= useState("");

    const handletask=(e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }

    const handleAddTask = () => {
        if (task.trim() !== '') {
            const newTask: Task = {
            id: Date.now(),
            task: task,
            complete: false,
        };
        setTodo([...todo, newTask]);
        setTask('');
        }
    };

    const handleDelete = (id :number) => {
        const update=todo.filter((item) => item.id !== id);
        setTodo(update);
    }

    const handlecomplete = (id:number) => {
        setTodo(todo.map((item) => 
        item.id === id ?{...item , complete: !item.complete} : item ))
    }


    return (
        <div>
            <input
            type="text"
            placeholder="Enter the task..."
            value={task}
            onChange={handletask}>
            </input>
            <button onClick={handleAddTask}>
                ADD
            </button>
            <ul>
                {todo.map((item) => (
                    <li key={item.id} className={item.complete ? "line-through text-red-500" : "line-through text-green-500"}>{item.task}
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                    <button onClick={() => handlecomplete(item.id)}>{item.complete ? 'INCOMPLETE':'COMPLETE' }</button>
                    </li>
                    
                ))}
            </ul>
        </div>

    );
}

export default Todo;