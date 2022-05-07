/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { ITodo } from 'lib/interfaces';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from 'lib/firebase';

export default async (req: NextApiRequest, res: NextApiResponse<ITodo | Error>) => {
  const {
    query: { id },
  } = req;

  if (typeof id === 'string') {
    console.log(`getting todo by id: ${id}`);

    try {
      const todoRef = doc(db, 'todos', id);
      const todoSnapshot = await getDoc(todoRef);
      if (todoSnapshot.exists()) {
        return res.status(200).json({
          id: todoSnapshot.id,
          title: todoSnapshot.data().title,
          done: todoSnapshot.data().done,
        } as ITodo);
      } else {
        console.log('Error: cannot find todo ' + id);
        return res.status(500).json(new Error('Error: cannot find todo ' + id));
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(new Error('Error while trying to retrieve a todo.'));
    }
  } else {
    console.log('Error: id is not of correct type');
    return res.status(500).json(new Error('Error: id is not of correct type'));
  }
};
