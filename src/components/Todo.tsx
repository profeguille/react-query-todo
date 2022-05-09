import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { CloseButton, Divider, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { deleteTodo, updateTodo } from 'lib/fetchFunctions';
import { ISuccessResponse, ITodo } from 'lib/interfaces';
import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ErrorDiv from './ErrorDiv';

interface Props {
  todo: ITodo;
}
const Todo: FC<Props> = (props: Props) => {
  const { todo } = props;
  const reactQueryClient = useQueryClient();

  const [done, setDone] = useState(todo.done);
  const [hideTodo, setHideTodo] = useState(false);

  const updateMutation = useMutation<ITodo, Error, ITodo>(async (todo) => updateTodo(todo), {
    onSuccess: () => {
      reactQueryClient.invalidateQueries('todos');
    },
  });

  const deleteMutation = useMutation<ISuccessResponse, Error, string>(async (id) => deleteTodo(id), {
    onSuccess: () => {
      reactQueryClient.invalidateQueries('todos');
    },
  });

  const handleClickInvert = () => {
    if (updateMutation.isLoading) return;
    setDone(!done);
    updateMutation.mutate(
      { ...todo, done: !todo.done },
      {
        onSuccess: () => {
          updateMutation.reset();
        },
        onError: () => {
          setDone(!done);
        },
      }
    );
  };

  const handleClickDelete = () => {
    if (deleteMutation.isLoading) return;
    deleteMutation.mutate(todo.id, {
      onSuccess: () => {
        deleteMutation.reset();
        setHideTodo(true);
      },
    });
  };

  let msg =
    (updateMutation.isError ? updateMutation?.error?.message + ' ' : '') + (deleteMutation.isError ? deleteMutation?.error?.message : '');

  useEffect(() => {
    setDone(todo.done);
  }, [todo.done]);

  if (hideTodo) return <></>;
  return (
    <>
      <Divider my={2} />
      <Grid key={todo.id} templateColumns="1fr 0fr 0fr" gap={1}>
        <GridItem>{todo.title}</GridItem>
        <GridItem>
          <IconButton
            isDisabled={updateMutation.isLoading}
            onClick={() => handleClickInvert()}
            aria-label="Search database"
            icon={done ? <CheckIcon boxSize="3" /> : <></>}
            size="xs"
            margin={1}
          />
        </GridItem>

        <GridItem>
          <IconButton
            isLoading={deleteMutation.isLoading}
            isDisabled={deleteMutation.isLoading}
            onClick={() => handleClickDelete()}
            aria-label="Search database"
            icon={<DeleteIcon />}
            size="xs"
            margin={1}
          />
        </GridItem>
      </Grid>
      {msg && <ErrorDiv msg={msg} />}
    </>
  );
};
export default Todo;
