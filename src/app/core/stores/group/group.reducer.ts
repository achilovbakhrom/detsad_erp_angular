import { createReducer, on } from '@ngrx/store';
import { getInitialGroupState } from './group.state';
import {
  fetchGroupListError,
  fetchGroupListSuccess,
  saveGroup,
  saveGroupFailure,
  saveGroupSuccess,
} from './group.actions';

export const groupReducer = createReducer(
  getInitialGroupState(),
  on(saveGroup, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveGroupSuccess, (state, { group }) => ({
    ...state,
    loading: false,
    group,
    error: null,
  })),
  on(saveGroupFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchGroupListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchGroupListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
