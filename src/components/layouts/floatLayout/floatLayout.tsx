import Info from "../../../components/info/info";
import CreateDirectory from "../../../components/createDirectory/createDirectory";
import RemoveConfirmation from "../../../components/removeConfirm/removeConfirm";
import Rename from "../../../components/rename/rename";
import { useMycloudSelector } from "../../../store/mycloud/mycloudStoreHooks";
import style from "./floatLayout.module.css";

const FloatLayout = () => {
  const floatType = useMycloudSelector((s) => s.floatType);
  return (
    <>
      {floatType !== "none" && (
        <div
          data-testid="floatLayout"
          id="floatLayout"
          className={style.holder}
        >
          {floatType === "edit" && <Rename />}
          {floatType === "removeConfirm" && <RemoveConfirmation />}
          {floatType === "createDirectory" && <CreateDirectory />}
          {floatType === "info" && <Info />}
        </div>
      )}
    </>
  );
};

export default FloatLayout;
