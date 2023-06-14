import React from 'react';
import { useTodos } from './useTodos';
import { TodoCounter } from '../ui/TodoCounter';
import { TodoSearch } from '../ui/TodoSearch';
import { TodoList } from '../ui/TodoList';
import { TodoItem } from '../ui/TodoItem';
import { TodosLoading } from '../ui/TodosLoading';
import { TodosError } from '../ui/TodosError';
import { TodosEmpty } from '../ui/TodosEmpty';
import { CreateTodoButton } from '../ui/CreateTodoButton';
import { TodoForm } from '../ui/TodoForm';
import { Modal } from '../ui/Modal';
import { TodoHeader } from '../ui/TodoHeader';
import { ChangeAlert } from '../ui/ChangeALert';

function App() {
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    totalTodos,
    completedTodos,
    openModal,
    searchValue,
  } = state;
  
  const {
    setOpenModal,
    addTodo,
    completeTodo,
    deleteTodo,
    setSearchValue,
    sincronizeTodos,
  } = stateUpdaters;

  return (
    <React.Fragment>

      <TodoHeader loading={loading}>
        <TodoCounter 
          totalTodos={totalTodos} 
          completedTodos={completedTodos}
        />
        <TodoSearch 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <TodosEmpty />}
        onEmptySearchResults={(searchText) => <p>No hay resultados para tu búsqueda de {searchText}</p>}
        render={todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      >
        {/* {todo => (
          <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )} */}
      </TodoList>

      <CreateTodoButton setOpenModal={setOpenModal}/>

      {openModal && (
        <Modal>
          <TodoForm 
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <ChangeAlert 
        sincronize={sincronizeTodos}
      />

    </React.Fragment>
  );
}

export default App;