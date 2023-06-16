import React from 'react';
import { TodoForm } from '../../ui/TodoForm';
import { useTodos } from '../useTodos';
import { useParams } from 'react-router-dom';
import { TodosLoading } from '../../ui/TodosLoading';

function EditTodoPage() {
  const params = useParams();
  const id = Number(params.id);

  const { stateUpdaters, state } = useTodos();
  const { getTodo, loading } = state;
  const { editTodo } = stateUpdaters;

  if (loading) {
    return (
      <TodosLoading />
    )
  } else {
    const todo = getTodo(id);

    return (
      <TodoForm 
        label='Edita tu TODO'
        defaultTodoText={todo.text}
        submitText='Editar'
        submitEvent={(newText) => editTodo(id, newText)}
      />
    )
  }

  
}

export { EditTodoPage };