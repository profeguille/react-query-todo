/* eslint-disable import/no-anonymous-default-export */
import { doc, setDoc } from 'firebase/firestore/lite';
import { db } from 'lib/firebaseConnection';
import { ITodo } from 'lib/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<ITodo | Error>) => {
  const { id, title, done } = req.body;

  if (typeof id === 'string' && id && typeof title === 'string' && title && typeof done === 'boolean') {
    try {
      await setDoc(
        doc(db, 'todos', id),
        {
          title,
          done,
        },
        { merge: true }
      );
      return res.status(200).json({ id, title, done });
    } catch (e) {
      console.log(e, { id, title, done });
      return res.status(500).json(new Error('Error while trying to update todo: ' + id));
    }
  } else {
    console.log('Error: title/done not properly set', { id, title, done });
    return res.status(500).json(new Error('Error: wrong id/title/done.'));
  }
};
