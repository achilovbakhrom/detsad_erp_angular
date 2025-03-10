import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountState } from '../../model/AccountState';

@Injectable({
  providedIn: 'root',
})
export class AccountStateService {
  constructor(private httpClient: HttpClient) {}

  fetchAccountState(): Observable<AccountState> {
    return this.httpClient.get<AccountState>(`finance/accounts/`);
  }
}
