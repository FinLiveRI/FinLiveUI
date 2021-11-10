export const logError = (error: any): void => {
  if (error.response) {
    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

export const getStoredToken = () => {
  const user: string | null = localStorage.getItem("user");
  const obj: any = user ? JSON.parse(user) : null;
  const token: string = obj?.access;

  return token || null;
};

export const humanFileSize = (size: number): string => {
  const unit: number = Math.floor(Math.log(size) / Math.log(1000));
  return (
    Number((size / Math.pow(1000, unit)).toFixed(2)) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][unit]
  );
};
