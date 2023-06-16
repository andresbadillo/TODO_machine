import React from 'react';
import { useLocalStorage } from './useLocalStorage';

// const TodoContext = React.createContext();

function useTodos() {
    const {
        item: todos, 
        saveItem: saveTodos, 
        loading, 
        error,
        sincronizeItem: sincronizeTodos,
    } = useLocalStorage('TODOS_V2', []);
    const [searchValue, setSearchValue] = React.useState('');
    
    const [openModal, setOpenModal] = React.useState(false);
    
    const completedTodos = todos.filter(todo => !!todo.completed).length; /* !! - devuelve un boleano */
    const totalTodos = todos.length;
    
    const searchedTodos = todos.filter(
        (todo) => {
            const todoText = todo.text.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return todoText.includes(searchText);
        }
    );

    const addTodo = (text) => {
        const id = newTodoId();
        const newTodos = [...todos];
        newTodos.push({
            text,
            id,
            completed: false,
        });
        saveTodos(newTodos);
    }
    
    const completeTodo = (id) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.id === id
        );
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    };
    
    const deleteTodo = (id) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.id === id
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    const state = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        openModal,
      };
      
      const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        deleteTodo,
        setOpenModal,
        sincronizeTodos,
      };

    return {
        state, 
        stateUpdaters,
    };
}

function newTodoId() {
    return Date.now();
}

export { useTodos };