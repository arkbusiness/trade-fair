import {
  useMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { clientFetcher } from '../lib';

type UseCustomMutationOptions<
  TData,
  TError,
  TVariables extends AxiosRequestConfig
> = Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;

export function useCustomMutation<
  TData,
  TError = unknown,
  TVariables extends AxiosRequestConfig = AxiosRequestConfig
>(
  options?: UseCustomMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>({
    mutationFn: (variables: TVariables) => clientFetcher<TData>(variables),
    ...options
  });
}
