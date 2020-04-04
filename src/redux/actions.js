import { createAction } from '@reduxjs/toolkit';
import types from './types'

export const addContact = createAction(types.ADD_CONTACT);
export const deleteContact = createAction(types.DELETE_CONTACT);
export const filterContact = createAction(types.FILTER_CONTACT);
