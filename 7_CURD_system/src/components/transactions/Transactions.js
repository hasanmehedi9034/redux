import React from 'react'
import { useSelector } from 'react-redux'
import Transaction from './Transaction'

export default function Transactions() {
    const {transactions, isLoading, isError, error} = useSelector(state =>  state.transaction);

    // decide what to render
    let content = null;
    if(isError) content = <p>Loading...</p>
    if(!isLoading && isError) content = <p className="error">{error}</p>
    if(!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id} />)
    }
    if(!isLoading && !isError && transactions?.length === 0) {
        content = <p>No Transaction Founded</p>
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>
            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    )
}
