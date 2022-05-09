import { Center, Container, Divider, Heading } from '@chakra-ui/react';
import AddTodo from 'components/AddTodo';
import ErrorDiv from 'components/ErrorDiv';
import Todo from 'components/Todo';
import { getTodos } from 'lib/fetchFunctions';
import { ITodo } from 'lib/interfaces';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
  const queryTodos = useQuery<ITodo[], Error, ITodo[], string>('todos', getTodos);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!queryTodos.isLoading && !queryTodos.isFetching) {
      setShowSpinner(false);
    }
  }, [queryTodos.isLoading, queryTodos.isFetching]);

  let msg = queryTodos.isError ? 'An error occurred please try again later: ' + queryTodos.error?.message : '';

  return (
    <>
      <Head>
        <title>React Query Todo App</title>
        <meta name="description" content="React Query Todo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center>
        <Container maxW="md">
          {msg && <ErrorDiv msg={msg} />}
          <Heading my={10}>React Query - Todo</Heading>
          <AddTodo showSpinner={showSpinner} setShowSpinner={setShowSpinner} />
          {queryTodos.data?.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
          <Divider my={2} />
        </Container>
      </Center>
    </>
  );
};

export default Home;
