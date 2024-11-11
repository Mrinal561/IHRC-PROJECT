import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'
import login, { AuthenticationState } from './slices/login'
import company, { CompanyState } from './slices/company/companySlice'
import companyGroup, {
    CompanyGroupState,
} from './slices/companyGroup/companyGroupSlice'
import user, { UserState } from './slices/userEntity/UserEntitySlice'
import compliance, {
    ComplianceState,
} from './slices/compliance/complianceSlice'
import assignedCompliance, {
    ComplianceAssignmentState,
} from './slices/AssignedCompliance/assignedComplianceSlice'
import dueCompliance, {
    DueComplianceState,
} from './slices/dueCompliance/dueComplianceSlice'
import branch, { BranchState } from './slices/branch/branchSlice'
import compliance, {ComplianceState} from './slices/compliance/complianceSlice'
import assignedCompliance,{ ComplianceAssignmentState } from './slices/AssignedCompliance/assignedComplianceSlice';
import dueCompliance, { DueComplianceState } from './slices/dueCompliance/dueComplianceSlice'
import status,{ StatusState } from './slices/dueCompliance/statusUpdateSlice'
import esisetup, { EsiSetupState } from './slices/esiSetup/esiSetupSlice'



export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    login: CombinedState<AuthenticationState>
    companyGroup: CompanyGroupState
    compliance: ComplianceState
    company: CompanyState
    branch: BranchState
    due: DueComplianceState
    user: UserState
    esiSetup: EsiSetupState
    locale: LocaleState
    theme: ThemeState
    assigedCompliance: ComplianceAssignmentState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth,
    base,
    locale,
    theme,
    login,
    companyGroup,
    company,
    branch,
    user,
    compliance,
    assignedCompliance,
    dueCompliance,
    status,
    esisetup,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

export default rootReducer
