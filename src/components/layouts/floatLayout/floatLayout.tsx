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
        </div>
      )}
    </>
  );
};

export default FloatLayout;
