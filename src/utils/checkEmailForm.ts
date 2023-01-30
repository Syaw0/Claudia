const checkEmailForm = (addr: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addr)) {
    return true;
  }
  return false;
};

export default checkEmailForm;
