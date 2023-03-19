import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTransaction, createTransaction } from '../features/transaction/transactionSlice';

export default function Form() {
    const { isLoading, isError, error } = useSelector(state => state.transaction)
    const dispatch = useDispatch();
    const editing = useSelector(state => state.transaction.editing)
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false);

    // listen for edit mode active
    useEffect(() => {
        const { id, name, amount, type } = editing;
        if (id) {
            setEditMode(true);
            setName(name)
            setAmount(amount)
            setType(type)
        }
        else {
            setEditMode(false);
            reset();
        }
    }, [editing])

    // reset form
    const reset = () => {
        setName('')
        setAmount('')
        setType('')
    }

    // new transaction create
    const handleCreate = (e) => {
        e.preventDefault();
        dispatch(createTransaction({
            name,
            type,
            amount: parseInt(amount),
        }));
        reset()
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(changeTransaction({
            id: editing.id,
            data: {
                name: name,
                amount: amount,
                type: type,
            }
        }))
        reset();
        setEditMode(false);
    }

    // cancel edit mode
    const cancelEditMode = () => {
        setEditMode(false)
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="enter title"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === 'income'}
                            onChange={e => setType('income')}
                        />
                        <label >Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === 'expense'}
                            onChange={e => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input
                        type="number"
                        placeholder="300"
                        name="amount"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        required
                    />
                </div>

                <button disabled={isLoading} type='submit' className="btn">{editMode ? 'Update Transaction' : 'Add Transaction'}</button>
                {!isLoading && isError && <p className="error">{error}</p>}
            </form>

            {editMode && <button onClick={cancelEditMode} className="btn cancel_edit">Cancel Edit</button>}
        </div>
    )
}
