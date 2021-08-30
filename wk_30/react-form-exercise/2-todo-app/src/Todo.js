import { useState } from 'react';

const Todo = ({ id, todo, idx, remove, edit }) => {
	const [editTodo, setEditTodo] = useState(todo);
	const [isEditing, showEditForm] = useState(false);

	const showEdit = () => {
		showEditForm(!isEditing);
	};

	const handleChange = (e) => {
		setEditTodo(e.target.value);
	};

	const handleEdit = (e) => {
		e.preventDefault();
		edit(id, editTodo);
		showEditForm(false);
	};

	return (
		<div className="Todo">
			<p>
				{idx + 1} - {todo}
				<button onClick={showEdit} style={{ marginLeft: '10px' }}>
					Edit
				</button>
				<button onClick={() => remove(id)} style={{ marginLeft: '10px' }}>
					X
				</button>
			</p>

			{isEditing && (
				<div>
					<form onSubmit={handleEdit}>
						<input type="text" value={editTodo} onChange={handleChange} />
						<button>Edit Todo</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Todo;
