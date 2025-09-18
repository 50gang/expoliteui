export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    try {
      return user ? (JSON.parse(user) as Iuser) : ({} as Iuser);
    } catch {
      return {} as Iuser;
    }
  }
  return {} as Iuser;
};
