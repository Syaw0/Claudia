const IconMenu = (params: IconTypes) => {
  return (
    // width="72" height="48"
    <svg {...params} viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 48H72V40H0V48ZM0 28H72V20H0V28ZM0 0V8H72V0H0Z" />
    </svg>
  );
};

export default IconMenu;
