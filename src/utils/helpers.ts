export const logError = (error: any): void => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error('Error', error.message);
  }
}

export const getStoredToken = () => {
  const user: string | null = localStorage.getItem("user");
  const obj: any = user ? JSON.parse(user) : null;
  const token: string = obj?.access;

  return token || null;
}