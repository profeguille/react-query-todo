/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { ITodo } from 'lib/interfaces';
import { collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
import { db } from 'lib/firebase';

export default async (req: NextApiRequest, res: NextApiResponse<ITodo[] | Error>) => {
  try {
    const todosRef = query(collection(db, 'todos'), orderBy('createdAt'));
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
