import caseize, { CompatibleCasesConstants } from 'caseize';
import _ from 'lodash';
import { AxiosRequestConfig } from 'axios';
import { Cases, AxiosCaseize, InterceptorType } from './types';

const defaultCases: Cases = {
  request: CompatibleCasesConstants.SNAKECASE,
  response: CompatibleCasesConstants.CAMELCASE,
};

const areEqualsUrl = (comparatorUrl: string, currentUrl: string) => {
  const [comparatorResources, currentResources] = [
    comparatorUrl,
    currentUrl,
  ].map((u) => u.split('/'));

  return (
    (comparatorResources.length === currentResources.length ||
      comparatorResources[comparatorResources.length - 1] === '*') &&
    !comparatorResources
      .map(
        (resource, i) =>
          resource === currentResources[i] ||
          resource === '*' ||
          (!currentResources[i] &&
            comparatorResources[comparatorResources.length - 1] === '*'),
      )
      .includes(false)
  );
};

const axiosCaseize: AxiosCaseize = (
  instance,
  { cases, disabledOn = [] } = {},
) => {
  cases = {
    ...defaultCases,
    ...cases,
  };

  const isDisabled = (
    interceptor: InterceptorType,
    { method: requestMethod, url: requestUrl = '' }: AxiosRequestConfig,
  ) => {
    if (!requestMethod) return false;

    return !!_.find(
      disabledOn,
      ({ url, on, method }) =>
        areEqualsUrl(url, requestUrl) &&
        (!on || on === interceptor) &&
        (_.isArray(method)
          ? method.includes(requestMethod)
          : method === requestMethod),
    );
  };

  instance.interceptors.request.use((req) => {
    if (!isDisabled('request', req) && cases && cases.request) {
      if (req.data && !(req.data instanceof FormData))
        req.data = caseize(req.data, cases.request);
      if (req.params) req.params = caseize(req.params, cases.request);
    }

    return req;
  });

  instance.interceptors.response.use((res) => {
    if (
      !isDisabled('response', res.config) &&
      res.data &&
      cases &&
      cases.response
    ) {
      try {
        JSON.parse(JSON.stringify(res.data));
        res.data = caseize(res.data, cases.response);
      } catch (error) {
        console.error('data is not caseizable');
      }
    }

    return res;
  });
};

export default axiosCaseize;
