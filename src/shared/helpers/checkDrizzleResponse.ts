function checkDrizzleResponse<T, K>(response: { value: T } | undefined, _default: K): T | K {
  return response && response.value !== undefined && response.value || _default;
}

export default checkDrizzleResponse;
