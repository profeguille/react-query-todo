/* eslint-disable import/no-anonymous-default-export */
import { deleteDoc, doc } from 'firebase/firestore/lite';
import { db } from 'lib/firebaseConnection';
import { ISuccessResponse } from 'lib/interfaces';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse<ISuccessResponse | Error>) => {
  const { id } = req.body;

  if (typeof id === 'string' && id) {
    try {
      await deleteDoc(doc(db, 'todos', id));
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json(new Error('Error while trying to delete todo: ' + id));
    }
  } else {
    console.log('Error: id not properly set' + id);
    return res.status(500).json(new Error('Error: id not properly set'));
  }
};
