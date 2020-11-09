import Head from 'next/head';
import { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Todo } from '../components/Todo';
import { TodoForm } from '../components/TodoForm';
import { TodosContext } from '../context/TodosContext';
import { minifyRecords, table } from './api/utils/Airtable';
import auth0 from './api/utils/auth0';

export default function Home({ initialTodos, user }) {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <div className='container mx-auto my-10 max-w-xl'>
      <Head>
        <title>JAMStack TODO app</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar user={user} />

      <main>
        {user && (
          <>
            <h1 className='text-2xl text-center mb-4'>My Todos</h1>
            <TodoForm />
            <ul>
              {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
            </ul>
          </>
        )}
      </main>

      <footer>
        Completed: {todos.filter(({ fields }) => !!fields?.completed).length} /
        {todos.length}
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  let todos = [];

  try {
    if (session?.user) {
      todos = await table
        .select({
          filterByFormula: `userId = '${session.user.sub}'`,
        })
        .firstPage();
    }
    return {
      props: {
        initialTodos: minifyRecords(todos),
        user: session?.user || null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { error: error.message, initialTodos: [] },
    };
  }
}
