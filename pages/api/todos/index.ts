/* eslint-disable import/no-anonymous-default-export */
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { db } from 'lib/firebaseConnection';
import { ITodo } from 'lib/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<ITodo[] | Error>) => {
  try {
    const todosRef = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const todosSnapshot = await getDocs(todosRef);
    const todosList: ITodo[] = todosSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      done: doc.data().done,
    })) as ITodo[];

    return res.status(200).json(todosList);
  } catch (e) {
    console.log(e);
    return res.status(500).json(new Error('Error while trying to retrieve todos.'));
  }
};
