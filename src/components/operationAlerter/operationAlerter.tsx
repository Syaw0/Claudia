import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import { useEffect, useRef } from "react";
import Message from "../message_v2/message";
import style from "./operationAlerter.module.css";

const OperationAlerter = () => {
  const alerts = useMycloudSelector((s) => s.alerts);
  const ref: any = useRef(null);

  useEffect(() => {
    let div = ref.current as HTMLDivElement;
    div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
  }, [alerts]);
  return (
    <div
      data-testid="operationAlerterHolder"
      ref={ref}
      className={style.holder}
    >
      {alerts.map((alert, index) => {
        return <Message id={index} {...alert} key={index} />;
      })}
    </div>
  );
};

export default OperationAlerter;
