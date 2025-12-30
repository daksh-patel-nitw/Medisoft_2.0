export interface ApiResponseDTO<T = any> {
  message?: string;
  show: boolean;
  data?: T;
}