import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export const useSetParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchParamsObject = useMemo(() => {
    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, `${value}`);
    history.replaceState(null, '', `${pathname}?${params.toString()}`);
  };

  const removeMultipleQueryParams = (paramsToRemove: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    paramsToRemove.forEach((param) => {
      params.delete(param);
    });

    const newPathname = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    history.replaceState(null, '', newPathname);
  };

  const removeQueryParam = (param: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(param);

    const newPathname = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;

    history.replaceState(null, '', newPathname);
  };

  const setMultipleParam = (paramsToUpdate: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(paramsToUpdate).forEach((key) => {
      const value = paramsToUpdate[key].toString();
      if (value) {
        // Only set if value is not empty
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    history.replaceState(null, '', `${pathname}?${params.toString()}`);
  };

  const hasSearchParams = () => {
    return Object.keys(searchParamsObject).length > 0;
  };

  return {
    setParam,
    removeMultipleQueryParams,
    searchParamsObject,
    removeQueryParam,
    setMultipleParam,
    hasSearchParams
  };
};
