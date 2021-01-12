import { CompatibleCases } from 'caseize';
import { AxiosInstance } from 'axios';

export interface Cases {
  request: CompatibleCases | null,
  response: CompatibleCases | null,
}

export type CaseizeInterceptors = (instance: AxiosInstance, cases?: Partial<Cases> ) => void