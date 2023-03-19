import React from 'react'
import editImage from '../../assets/images/edit.svg'
import deleteImage from '../../assets/images/delete.svg'
import { useDispatch } from 'react-redux';
import { editActive, editInactive } from '../../features/transaction/transactionSlice'


export default function Transaction({ transaction }) {
    const dispatch = useDispatch()
    const { name, id, type, amount } = transaction || {};

    const handleEdit = () => {
        dispatch(editActive(transaction))
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
                <button className="link">
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
