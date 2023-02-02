import useCloseFloat from "../../hooks/useCloseFloat";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./info.module.css";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";

const Info = () => {
  const selectedFileData = useMycloudSelector((s) => s.selectedFileData);
  const closeFloat = useCloseFloat();
  const quit = () => {
    closeFloat();
  };

  return (
    <div data-testid="infoHolder" className={style.holder}>
      <Text className={style.headText} variant="headline4">
        Information
      </Text>

      <div className={style.infos}>
        <div className={style.infosItem}>
          <Text>Name</Text>
          <Text>{selectedFileData.name}</Text>
        </div>

        <div className={style.infosItem}>
          <Text>Date</Text>
          <Text>{selectedFileData.date}</Text>
        </div>

        <div className={style.infosItem}>
          <Text>Size</Text>
          <Text>{selectedFileData.size}</Text>
        </div>
      </div>

      <div className={style.buttonHolder}>
        <Button testid="infoQuitButton" onClick={quit} variant="shadow">
          Quit
        </Button>
      </div>
    </div>
  );
};

export default Info;
