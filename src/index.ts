import caseize, { CompatibleCasesConstants } from 'caseize';
import { Cases, CaseizeInterceptors } from './types';

const defaultCases: Cases = {
  request: CompatibleCasesConstants.SNAKECASE,
  response: CompatibleCasesConstants.CAMELCASE,
}

const caseizeInterceptors: CaseizeInterceptors = (instance, cases = {}) => {
  cases = {
    ...defaultCases,
    ...cases,
  };

  instance.interceptors.request.use(req => {
    if (cases.request) {
      if (req.data) req.data = caseize(req.data, cases.request);
      if (req.params) req.params = caseize(req.params, cases.request);
    }

    return req;
  });

  instance.interceptors.response.use(res => {
    if (res.data && cases.response) res.data = caseize(res.data, cases.response);

    return res;
  });
};

export default caseizeInterceptors;
