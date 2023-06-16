import React from 'react';
import './TodoForm.css'
import { useNavigate } from 'react-router-dom';

function TodoForm({ submitEvent, label, submitText, defaultTodoText }) {
    const navigate =useNavigate();
    const [newTodoValue, setNewTodoValue] = React.useState(defaultTodoText || '');

    const onCancel = () => {
        // setOpenModal(false);
        navigate('/');
    };

    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        submitEvent(newTodoValue);
        // setOpenModal(false);
        navigate('/');
    };

    return (
        <form onSubmit={onSubmit}>
            <label>{label}</label>
            <textarea 
                placeholder='Hacer compras'
                value={newTodoValue}
                onChange={onChange}
                required    
            />
            <div className='TodoForm-buttonContainer'>
                <button 
                    type='button' 
                    className='TodoForm-button TodoForm-button--cancel'
                    onClick={onCancel}
                >Cancelar</button>
                <button 
                    type='submit' 
                    className='TodoForm-button TodoForm-button--add'
                >{submitText}</button>
            </div>
        </form>
    )
}

export { TodoForm };