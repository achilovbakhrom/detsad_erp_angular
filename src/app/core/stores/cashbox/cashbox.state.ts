import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Cashbox } from '../../../model/Cashbox';

export type CashboxState = BaseListState<Cashbox> & {
  cashbox: Nillable<Cashbox>;
  error: any;
};

export const initialState: CashboxState = {
  data: null,
  total: null,
  page: null,
  size: null,
  cashbox: null,
  loading: false,
  error: null,
};

export function getInitialCashboxState(): CashboxState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.cashbox || initialState;
}
