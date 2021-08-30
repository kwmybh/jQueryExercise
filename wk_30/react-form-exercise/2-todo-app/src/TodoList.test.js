import { render, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it('renders without crashing', () => {
	render(<TodoList />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<TodoList />);
	expect(asFragment()).toMatchSnapshot();
});

it('add new item', () => {
	const { getByLabelText, getByText } = render(<TodoList />);
	const input = getByLabelText('Add Todo:');
	const btn = getByText('Submit');
	fireEvent.change(input, { target: { value: 'Go to Sleep' } });
	fireEvent.click(btn);

	expect(input).toHaveValue('');
	expect(getByText('1 - Go to Sleep')).toBeInTheDocument();
	expect(getByText('Edit')).toBeInTheDocument();
	expect(getByText('X')).toBeInTheDocument();
});

it('edit todo', () => {
	const { getByLabelText, getByText, getByDisplayValue, queryByText } = render(
		<TodoList />
	);
	const input = getByLabelText('Add Todo:');
	const btn = getByText('Submit');
	fireEvent.change(input, { target: { value: 'Go to Sleep' } });
	fireEvent.click(btn);
	fireEvent.click(getByText('Edit'));
	const edit = getByDisplayValue('Go to Sleep');
	fireEvent.change(edit, { target: { value: 'Wake Up' } });
	fireEvent.click(getByText('Edit Todo'));

	expect(getByText('1 - Wake Up')).toBeInTheDocument();
	expect(queryByText('1 - Go to Sleep')).not.toBeInTheDocument();
});

it('can delete a todo', () => {
	const { getByLabelText, getByText, queryByText } = render(<TodoList />);
	const input = getByLabelText('Add Todo:');
	const btn = getByText('Submit');
	fireEvent.change(input, { target: { value: 'Go to Sleep' } });
	fireEvent.click(btn);

	fireEvent.click(getByText('X'));

	expect(queryByText('1 - Go to Sleep')).not.toBeInTheDocument();
});
