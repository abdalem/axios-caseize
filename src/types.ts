import { CompatibleCases } from 'caseize';
import { AxiosInstance, Method } from 'axios';

export interface Cases {
  request: CompatibleCases | null;
  response: CompatibleCases | null;
}

export type InterceptorType = 'response' | 'request';

interface AxiosCaseizeOptions {
  cases?: Partial<Cases>;
  disabledOn?: {
    url: string;
    method: Method | Method[];
    on?: InterceptorType;
  }[];
}

export type AxiosCaseize = (
  instance: AxiosInstance,
  options?: AxiosCaseizeOptions,
) => void;
