const guestRegex = /\/logout|\/mycloud|\/setting/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url) || url === "/";
};

export default checkGuestUserAccess;
