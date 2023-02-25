import React, { useState } from 'react'
import notesImage from '../assets/images/notes.png'
import doubleTickImg from '../assets/images/double-tick.png'
import plusIcon from '../assets/images/plus.png'
import { useDispatch } from 'react-redux';
import { allCompleted, clearCompleted } from '../redux/todos/actions';
import addTodo from '../redux/todos/thunk/addTodo';

export default function Header() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addTodo(input));
        setInput('');
    }

    const completeHandler = () => {
        dispatch(allCompleted())
    }
    const clearHandler = () => {
        dispatch(clearCompleted())
    }

    return (
        <div>
            <form
            onSubmit={submitHandler}
                className="flex items-center bg-gray-100 px-4 py-4 rounded-md"
            >
                <img
                    src={notesImage}
                    className="w-6 h-6"
                    alt="Add todo"
                />
                <input
                value={input}
                onChange={handleInput}
                    type="text"
                    placeholder="Type your todo"
                    className="w-full text-lg px-4 py-1 border-none outline-none bg-gray-100 text-gray-500"
                />
                <button
                    type="submit"
                    className={`appearance-none w-8 h-8 bg-[url('${plusIcon}')] bg-no-repeat bg-contain`}
                ></button>
            </form>

            <ul className="flex justify-between my-4 text-xs text-gray-500">
                <li onClick={completeHandler} className="flex space-x-1 cursor-pointer">
                    <img
                        className="w-4 h-4"
                        src={doubleTickImg}
                        alt="Complete"
                    />
                    <span>Complete All Tasks</span>
                </li>
                <li onClick={clearHandler} className="cursor-pointer">Clear completed</li>
            </ul>
        </div>
    )
}
