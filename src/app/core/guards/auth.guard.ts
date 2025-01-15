import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../stores/auth/auth.state';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {}

  canActivate(): MaybeAsync<GuardResult> {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        if (authState.isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );
  }
}
