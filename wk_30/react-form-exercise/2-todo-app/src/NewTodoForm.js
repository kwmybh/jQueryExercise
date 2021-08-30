import { useState } from 'react';

const NewTodoForm = ({ addTodo }) => {
	const INITAL_STATE = {
		todo: '',
	};

	const [formData, setFormData] = useState(INITAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo({ ...formData });
		setFormData(INITAL_STATE);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="todo">Add Todo:</label>
			<input
				id="todo"
				type="text"
				name="todo"
				placeholder="Todo"
				value={formData.todo}
				onChange={handleChange}
			/>
			<button>Submit</button>
		</form>
	);
};

export default NewTodoForm;
