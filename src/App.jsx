import { useEffect, useState } from 'react';
import './styles.css';
import { NewTodoForm } from './NewTodoForm';
import { TodoList } from './TodoList';

export default function App() {
    {
        /*setting state*/
    }

    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem('ITEMS');
        if (localValue == null) return [];

        return JSON.parse(localValue);
    });

    useEffect(() => {
        localStorage.setItem('ITEMS', JSON.stringify(todos));
    }, [todos]);

    function toggleTodo(id, completed) {
        setTodos((currentTodos) => {
            return currentTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });
        });
    }

    function addTodo(title) {
        setTodos((currentTodos) => {
            return [
                ...currentTodos,
                { id: crypto.randomUUID(), title, complete: false },
            ];
        });
    }

    function deleteTodo(id) {
        setTodos((currentTodos) => {
            return currentTodos.filter((todo) => todo.id !== id);
        });
    }

    return (
        <>
            <NewTodoForm onSubmit={addTodo} />
            {/* JSX looks almost identical to HTML with a few differences */}

            <h1 className='header'>Todo List</h1>
            <TodoList
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
            />
        </>
    );
}
