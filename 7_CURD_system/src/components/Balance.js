import React from 'react'
import { useSelector } from 'react-redux'

export default function Balance() {
    const { transactions } = useSelector(state => state.transaction)
    
    const calculateIncome =(transactions) => {
        let totalIncome = 0;
        transactions.forEach(transaction => {
            const {type, amount} = transaction;
            if(type === 'income') {
                totalIncome += amount
            }
            else {
                totalIncome -= amount
            }
        })
        return totalIncome;
    }

    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳ </span>
                {transactions.length > 0 ? <span>{calculateIncome(transactions)}</span> : <span>0</span>}
            </h3>
        </div>
    )
}
