/* eslint-disable import/no-anonymous-default-export */
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import { db } from 'lib/firebaseConnection';
import { ITodo } from 'lib/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<ITodo | Error>) => {
  const { title } = req.body;

  if (typeof title === 'string' && title) {
    try {
      const { id } = await addDoc(collection(db, 'todos'), {
        title,
        done: false,
        createdAt: serverTimestamp(),
      });
      return res.status(200).json({ id, title, done: false });
    } catch (e) {
      console.log(e);
      return res.status(500).json(new Error('Error while trying to add new todo: ' + title));
    }
  } else {
    console.log('Error: title is empty or not of correct type');
    return res.status(500).json(new Error('Error: id is not of correct type or empty.'));
  }
};
