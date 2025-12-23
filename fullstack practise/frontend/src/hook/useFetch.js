// useFetch.js
import { useState, useEffect } from 'react';

export function useFetch(url) {
  console.log("useFetch call")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  if (!url) return;

  const controller = new AbortController();

  const fetchData = async () => {
    try {
      console.log("+++call API++++")
      setLoading(true);
      const res = await fetch(url, { signal: controller.signal });
      const result = await res.json();
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return () => controller.abort();
}, [url]);

  return { data, loading, error };
}
