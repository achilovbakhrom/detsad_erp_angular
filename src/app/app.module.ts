import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/auth.interceptor';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { appInterceptor } from './core/interceptors/app.interceptor';
import { StoreModule } from '@ngrx/store';
import { localStorageSyncReducer } from './core/stores/auth/auth.meta-reducer';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './core/stores/auth/auth.reducer';
import { companyReducer } from './core/stores/company/company.reducer';
import { AuthEffects } from './core/stores/auth/auth.effects';
import { getInitialAuthState } from './core/stores/auth/auth.state';
import { getInitialCompanyState } from './core/stores/company/company.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CompanyEffects } from './core/stores/company/company.effects';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(
      { auth: authReducer, company: companyReducer },
      {
        metaReducers: [localStorageSyncReducer],
        initialState: {
          auth: getInitialAuthState(),
          company: getInitialCompanyState(),
        },
      }
    ),
    EffectsModule.forRoot([AuthEffects, CompanyEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([appInterceptor, tokenInterceptor, loggingInterceptor])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
