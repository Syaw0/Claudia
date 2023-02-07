const loggedUserRegex = /\/login|\/auth|\/signup|\/checkForSignup/;

const checkLoggedUserAccess = (url: string) => {
  return loggedUserRegex.test(url) || url === "/";
};

export default checkLoggedUserAccess;
