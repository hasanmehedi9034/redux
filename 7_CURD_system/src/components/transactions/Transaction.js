import React from 'react'
import editImage from '../../assets/images/edit.svg'
import deleteImage from '../../assets/images/delete.svg'

export default function Transaction({transaction}) {
    const {name, id, type, amount} = transaction || {};
    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {amount}</p>
                <button className="link">
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
