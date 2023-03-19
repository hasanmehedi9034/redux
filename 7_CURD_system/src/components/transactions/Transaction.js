import React from 'react'
import editImage from '../../assets/images/edit.svg'
import deleteImage from '../../assets/images/delete.svg'
import { useDispatch, useSelector } from 'react-redux';
import { editActive, editInactive, removeTransaction } from '../../features/transaction/transactionSlice'


export default function Transaction({ transaction }) {
    const dispatch = useDispatch()
    const {} = useSelector(state => state)
    const { name, id, type, amount } = transaction || {};

    const handleEdit = () => {
        dispatch(editActive(transaction))
    }

    const handleDelete = () => {
        dispatch(removeTransaction(id));
    }

    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button onClick={handleEdit} className="link">
                    <img
                        alt='Edit'
                        className="icon"
                        src={editImage}
                    />
                </button>
                <button onClick={handleDelete} className="link">
                    <img
                        alt='Delete'
                        className="icon"
                        src={deleteImage}
                    />
                </button>
            </div>
        </li>
    )
}
