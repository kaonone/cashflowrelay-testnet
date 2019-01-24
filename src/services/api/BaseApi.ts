import HttpActions from './HttpActions';

class BaseApi {
  protected actions: HttpActions;
  protected _token: string | null = null;

  set token(value: string | null) {
    this._token = value;
  }

  constructor(actions: HttpActions) {
    this.actions = actions;
  }

  // TODO ds: need to correct handler for response error
  // protected handleResponse<ResponseData, E extends ServerErrorKey, ErrorPayload>(
  //   response: Axios.AxiosXHR<IApiResponse<ResponseData, E, ErrorPayload>>,
  //   converter?: null,
  //   errorPayloadConverter?: (x: ErrorPayload) => any,
  // ): void;
  // protected handleResponse<ResponseData, E extends ServerErrorKey, ErrorPayload, Result>(
  //   response: Axios.AxiosXHR<IApiResponse<ResponseData, E, ErrorPayload>>,
  //   converter: Converter<ResponseData, Result>,
  //   errorPayloadConverter?: (x: ErrorPayload) => any,
  // ): Result;
  // protected handleResponse<ResponseData, E extends ServerErrorKey, ErrorPayload, Result>(
  //   response: Axios.AxiosXHR<IApiResponse<ResponseData, E, ErrorPayload>>,
  //   converter?: Converter<ResponseData, Result> | null,
  //   errorPayloadConverter?: (x: ErrorPayload) => any,
  // ): Result | void {
  //   const responseData = isDataResponse<ResponseData>(response.data) ? response.data.data : response.data;
  //   if (isErrorStatus(response.status)) {
  //     const apiError = makeApiError<ErrorPayload, any>(
  //       response.status,
  //       responseData,
  //       errorPayloadConverter,
  //     );
  //     throw apiError;
  //   }
  //   if (converter) {
  //     return converter(responseData as ResponseData);
  //   }
  // }

  protected get privateHeaders(): Record<string, string> {
    if (!this._token) {
      throw new Error('Api token not found!');
    }

    return { Authorization: `Bearer ${this._token}` };
  }
}

export default BaseApi;
