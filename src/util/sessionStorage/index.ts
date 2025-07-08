  export function getTokenInSessionStorage() {
  const token = sessionStorage.getItem("access_token");

  return token;
}
export const setTokenInSessionStorage = (token: string) =>
  sessionStorage.setItem("access_token", token);

export const clearSessionStorage = () => sessionStorage.clear();
