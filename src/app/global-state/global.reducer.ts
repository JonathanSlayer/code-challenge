import { createReducer, on } from '@ngrx/store';
import { setLoading } from './global.actions';
import { initialGlobalState } from './global.state';

export const globalReducer = createReducer(
  initialGlobalState,  
  on(setLoading, (state, { isLoading }) => ({ ...state, isLoading }))
);