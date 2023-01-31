import IconStar from "../assets/icons/iconStar";
import useEx from "../hooks/ex";

const toolbarItems: Omit<ToolBarItemPropsType, "sideInfo">[] = [
  { name: "Star", Icon: IconStar, hook: useEx },
  { name: "Delete File", Icon: IconStar, hook: useEx },
  { name: "Delete Folder", Icon: IconStar, hook: useEx },
];

export default toolbarItems;
