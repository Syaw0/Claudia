import IconEditDirectory from "../assets/icons/iconEditDirectory";
import IconRemoveDirectory from "../assets/icons/iconRemoveDirectory";
import IconCopy from "../assets/icons/iconCopy";
import IconDownload from "../assets/icons/iconDownload";
import IconEditFile from "../assets/icons/iconEditFile";
import IconRemoveFile from "../assets/icons/iconRemoveFile";
import IconStar from "../assets/icons/iconStar";
import useEx from "../hooks/ex";
import IconInfo from "../assets/icons/iconInfo";
import useRename from "../hooks/useRename";
import useRemoveConfirm from "../hooks/useRemoveConfirm";
import useInfo from "../hooks/useInfo";

const toolbarItems: Omit<ToolBarItemPropsType, "sideInfo">[] = [
  { name: "Star", Icon: IconStar, hook: useEx, type: "file" },
  { name: "Rename File", Icon: IconEditFile, hook: useRename, type: "file" },
  { name: "Make Copy", Icon: IconCopy, hook: useEx, type: "file" },
  { name: "Download", Icon: IconDownload, hook: useEx, type: "file" },
  {
    name: "Delete File",
    Icon: IconRemoveFile,
    hook: useRemoveConfirm,
    type: "file",
  },
  {
    name: "Delete Dir",
    Icon: IconRemoveDirectory,
    hook: useRemoveConfirm,
    type: "dir",
  },
  {
    name: "Rename Dir",
    Icon: IconEditDirectory,
    hook: useRename,
    type: "dir",
  },

  {
    name: "info",
    Icon: IconInfo,
    hook: useInfo,
    type: "file",
  },
  {
    name: "info",
    Icon: IconInfo,
    hook: useInfo,
    type: "dir",
  },
];

export default toolbarItems;
