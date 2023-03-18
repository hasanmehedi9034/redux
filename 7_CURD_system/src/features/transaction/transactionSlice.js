import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
    getTransaction,
    editTransaction,
    deleteTransaction,
    addTransaction
} from "./transactionAPI"

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: ''
}

export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async () => {
        const transactions = await getTransaction();
        return transactions
    }
)

export const createTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async (data) => {
        const transactions = await addTransaction(data);
        return transactions
    }
)

export const changeTransaction = createAsyncThunk(
    'transaction/changeTransaction',
    async ({ id, data }) => {
        const transactions = await editTransaction(id, data);
        return transactions
    }
)

export const removeTransaction = createAsyncThunk(
    'transaction/changeTransaction',
    async (id) => {
        const transactions = await deleteTransaction(id);
        return transactions
    }
)

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers: (builder) => {
        builder
            // fetching transactions
            .addCase(fetchTransactions.pending, (state, action) => {
                state.isError = false
                state.isLoading = true
                state.error = ''
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions = action.payload
                state.error = ''
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.error.message
                state.transactions = []
                state.isLoading = false
                state.isError = true
            })

            // creating transaction
            .addCase(createTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true
                state.error = ''
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions.push(action.payload)
                state.error = ''
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.error = action.error?.message
                state.isLoading = false
                state.isError = true
            })

            // change transaction
            .addCase(changeTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true
                state.error = ''
            })
            .addCase(changeTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = ''
                const index = state.transactions.findIndex(t => t.id === action.payload.id)
                state.transactions[index] = action.payload
            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.error = action.error?.message
                state.isLoading = false
                state.isError = true
            })

            // remove transaction
            .addCase(removeTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true
                state.error = ''
            })
            .addCase(removeTransaction.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.error = ''
                state.transactions = state.transactions.filter(t => t.id !== action.payload.id)
            })
            .addCase(removeTransaction.rejected, (state, action) => {
                state.error = action.error?.message
                state.isLoading = false
                state.isError = true
            })
    }
})

export default transactionSlice.reducer;