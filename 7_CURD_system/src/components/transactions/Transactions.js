import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Transaction from './Transaction'
import {fetchTransactions} from '../../features/transaction/transactionSlice'

export default function Transactions() {
    const dispatch = useDispatch()
    const {transactions, isLoading, isError, error} = useSelector(state =>  state.transaction);

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

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
