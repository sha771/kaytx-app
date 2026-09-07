import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi<T>(apiFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fnRef = useRef(apiFunction);
  fnRef.current = apiFunction;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fnRef.current();
      setData(result);
      return result;
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch };
}
