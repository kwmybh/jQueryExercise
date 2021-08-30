import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';

const TodoList = () => {
	const INITIAL_STATE = [];

	const [todos, setTodo] = useState(INITIAL_STATE);

	const addTodo = (newTodo) => {
		setTodo((todos) => [...todos, { ...newTodo, id: uuidv4() }]);
	};

	const updateTodo = (id, newTodo) => {
		setTodo((todos) =>
			todos.map((todo) => (todo.id === id ? { ...todo, todo: newTodo } : todo))
		);
	};

	const removeTodo = (id) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodo(newTodos);
	};

	return (
		<div>
			<h3>Todo List</h3>
			<NewTodoForm addTodo={addTodo} />
			<div className="todos">
				{todos.map((todo, idx) => (
					<Todo
						id={todo.id}
						todo={todo.todo}
						key={todo.id}
						idx={idx}
						remove={removeTodo}
						edit={updateTodo}
					/>
				))}
			</div>
		</div>
	);
};

export default TodoList;
