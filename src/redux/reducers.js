import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, filterContact } from './actions'

const innitialState = {
    contacts: [],
    filter: ''
}

const rootReducer = createReducer(innitialState, {
    [addContact]: (state, { payload }) => { return { ...state, contacts: [ ...state.contacts, payload] } },

    [deleteContact]: (state, { payload }) => { return { ...state, contacts: [ ...state.contacts.filter(contact => contact.id !== payload.id)] } },

    [filterContact]: (state, { payload }) => { return { ...state, filter: payload } }
})

export default rootReducer;