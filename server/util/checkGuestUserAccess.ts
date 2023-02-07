const guestRegex = /\/logout|\/mycloud/;

const checkGuestUserAccess = (url: string) => {
  return guestRegex.test(url) || url === "/";
};

export default checkGuestUserAccess;
