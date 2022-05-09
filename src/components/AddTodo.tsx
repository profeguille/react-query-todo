/* eslint-disable react-hooks/exhaustive-deps */
import { AddIcon } from '@chakra-ui/icons';
import { Button, Grid, Input } from '@chakra-ui/react';
import { createTodo } from 'lib/fetchFunctions';
import { ITodo } from 'lib/interfaces';
import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import ErrorDiv from './ErrorDiv';
interface Props {
  showSpinner: boolean;
  setShowSpinner: Dispatch<SetStateAction<boolean>>;
}
const AddTodo: FC<Props> = (props: Props) => {
  const reactQueryClient = useQueryClient();
  const textInput = useRef<HTMLInputElement>(null);

  const { setShowSpinner, showSpinner } = props;

  const createMutation = useMutation<ITodo, Error, string>(async (title) => createTodo(title), {
    onSuccess: () => {
      reactQueryClient.invalidateQueries('todos');
    },
  });

  const handleClickCreate = () => {
    if (createMutation.isLoading) return;

    if (textInput?.current?.value !== '') {
      setShowSpinner(true);

      createMutation.mutate(textInput?.current?.value || '', {
        onSuccess: () => {
          createMutation.reset();
        },
        onError: () => {
          setShowSpinner(false);
        },
      });
    }
  };

  useEffect(() => {
    if (!showSpinner && textInput?.current?.value) textInput.current.value = '';
  }, [showSpinner]);

  return (
    <>
      <Input ref={textInput} disabled={showSpinner} placeholder="Add a todo..." size="md" my={2} />
      <Grid justifyContent="flex-end">
        <Button
          onClick={() => handleClickCreate()}
          isDisabled={showSpinner}
          isLoading={showSpinner}
          leftIcon={<AddIcon />}
          colorScheme="teal"
          variant="solid"
          size="xs"
          my={2}
        >
          Add Todo
        </Button>
      </Grid>
      {createMutation.isError && <ErrorDiv msg={createMutation?.error?.message || ''} />}
    </>
  );
};
export default AddTodo;
