import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { searched } from '../features/filter/filterSlice';

export default function Search() {
    const { search } = useSelector(state => state.filter);
    const dispatch = useDispatch();
    const [input, setInput] = useState(search);
    const match = useMatch('/')
    const navigete = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searched(input));

        // if user is not in home page redirect to home page
        if(!match) {
            navigete('/')
        }

        setInput('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    )
}
