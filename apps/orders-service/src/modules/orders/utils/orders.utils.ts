import fetch from 'node-fetch';

export async function fetcher(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  const status = res.status;
  return { data, status };
}
