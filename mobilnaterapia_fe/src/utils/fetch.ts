async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    const errMsg = data?.errorMsg ?? response.statusText;
    throw new Error(errMsg);
  }
  if (data.error) {
    throw new Error(data.error);
  }

  return data as T;
}

function authHeader() {
  const jwt = localStorage.getItem("app.jwt");
  if (jwt) {
    return { Authorization:  jwt };
  }
}

async function fetchData<T>(
  url: string,
  data: unknown,
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH"
): Promise<T> {
  const request: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...authHeader(),
    },
  };
  if (data) {
    request.body = JSON.stringify(data);
  }
  const response = await fetch(url, request);
  return handleResponse(response);
}

type FetchMethod = <T>(url: string, data: unknown) => Promise<T>;

export const get: <T>(url: string) => Promise<T> = (url: string) =>
  fetchData(url, null, "GET");
export const post: FetchMethod = (url: string, data: unknown) =>
  fetchData(url, data, "POST");
export const patch: FetchMethod = (url: string, data: unknown) =>
  fetchData(url, data, "PATCH");
export const put: FetchMethod = (url: string, data: unknown) =>
  fetchData(url, data, "PUT");
export const del: FetchMethod = (url: string, data: unknown) =>
  fetchData(url, data, "DELETE");
