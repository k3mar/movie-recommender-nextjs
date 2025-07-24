export default interface HttpError extends Error {
  status?: number;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  response?: Response;
}
