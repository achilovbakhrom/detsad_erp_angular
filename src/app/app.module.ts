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
import { BranchEffects } from './core/stores/branch/branch.effects';
import { branchReducer } from './core/stores/branch/branch.reducer';
import { getInitialBranchState } from './core/stores/branch/branch.state';
import { commonReducer } from './core/stores/common/common.reducer';
import { getInitialCommonState } from './core/stores/common/common.state';
import { groupReducer } from './core/stores/group/group.reducer';
import { getInitialGroupState } from './core/stores/group/group.state';
import { GroupEffects } from './core/stores/group/group.effects';
import { ChildEffects } from './core/stores/child/child.effects';
import { childReducer } from './core/stores/child/child.reducer';
import { getInitialChildState } from './core/stores/child/child.state';
import { positionReducer } from './core/stores/position/position.reducer';
import { reasonReducer } from './core/stores/reason/reason.reducer';
import { getInitialPositionState } from './core/stores/position/position.state';
import { getInitialReasonState } from './core/stores/reason/reason.state';
import { PositionEffects } from './core/stores/position/position.effects';
import { ReasonEffects } from './core/stores/reason/reason.effects';
import { DepartmentEffects } from './core/stores/department/department.effects';
import { departmentReducer } from './core/stores/department/department.reducer';
import { getInitialDepartmentState } from './core/stores/department/department.state';
import { paymentTypeReducer } from './core/stores/payment-type/payment-type.reducer';
import { getInitialPaymentTypeState } from './core/stores/payment-type/payment-type.state';
import { PaymentTypeEffects } from './core/stores/payment-type/payment-type.effects';
import { EmployeeContractEffects } from './core/stores/employee-contract/employee-contract.effects';
import { employeeContractReducer } from './core/stores/employee-contract/employee-contract.reducer';
import { getInitialEmployeeContractState } from './core/stores/employee-contract/employee-contract.state';
import { employeeReducer } from './core/stores/employee/employee.reducer';
import { getInitialEmployeeState } from './core/stores/employee/employee.state';
import { EmployeeEffects } from './core/stores/employee/employee.effects';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(
      {
        common: commonReducer,
        auth: authReducer,
        company: companyReducer,
        branch: branchReducer,
        group: groupReducer,
        child: childReducer,
        position: positionReducer,
        reason: reasonReducer,
        department: departmentReducer,
        paymentType: paymentTypeReducer,
        employee: employeeReducer,
        employeeContract: employeeContractReducer,
      },
      {
        metaReducers: [localStorageSyncReducer],
        initialState: {
          common: getInitialCommonState(),
          auth: getInitialAuthState(),
          company: getInitialCompanyState(),
          branch: getInitialBranchState(),
          group: getInitialGroupState(),
          child: getInitialChildState(),
          position: getInitialPositionState(),
          reason: getInitialReasonState(),
          department: getInitialDepartmentState(),
          paymentType: getInitialPaymentTypeState(),
          employee: getInitialEmployeeState(),
          employeeContract: getInitialEmployeeContractState(),
        },
      }
    ),
    EffectsModule.forRoot([
      AuthEffects,
      CompanyEffects,
      BranchEffects,
      GroupEffects,
      ChildEffects,
      PositionEffects,
      ReasonEffects,
      DepartmentEffects,
      PaymentTypeEffects,
      EmployeeEffects,
      EmployeeContractEffects,
    ]),
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
