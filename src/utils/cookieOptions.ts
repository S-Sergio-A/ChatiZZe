export const cookieOptions = (maxAge: number) => {
  return {
    path: "/",
    secure: true,
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge)
  };
};
