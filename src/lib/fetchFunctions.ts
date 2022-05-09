import { ITodo } from './interfaces';

export const getTodos = async (): Promise<ITodo[]> => {
  const res = await fetch('/api/todos');
  if (res.ok) {
    return res.json();
  }
  throw Error('Fetch error while getting todos');
};

export const createTodo = async (title: string): Promise<ITodo> => {
  const res = await fetch('/api/todo/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Fetch error while creating todo.');
};

export const updateTodo = async (todo: ITodo): Promise<ITodo> => {
  const res = await fetch('/api/todo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Fetch error while updating todo.');
};

export const deleteTodo = async (id: string): Promise<ISuccessResponse> => {
  const res = await fetch('/api/todo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error('Fetch error while deleting todo.');
};
