import useFetch from "../../hooks/useFetch";
import { useMycloudSelector } from "../../store/mycloud/mycloudStoreHooks";
import logout, { loaderMsg } from "../../utils/logout";
import Button from "../button/button";
import Text from "../typography/typography";
import style from "./logoutSetting.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { insertAlert } from "../../store/mycloud/mycloudStore";
import { useRouter } from "next/router";
const LogoutSetting = () => {
  const router = useRouter();
  const [trigger, state, msg] = useFetch([logout], [loaderMsg]);
  const user = useMycloudSelector((s) => s.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state != "pending") {
      dispatch(insertAlert({ type: state, msg }));
    }
  }, [dispatch, msg, state]);

  const performLogout = async () => {
    const result = await trigger(0, user.id);
    if (result.status) {
      setTimeout(() => {
        router.replace("/auth");
      }, 500);
    }
  };
  return (
    <div data-testid="logoutSettingHolder" className={style.holder}>
      <Text variant="headline4" className={style.headText}>
        Logout
      </Text>

      <div className={style.buttonHolder}>
        <Button
          testid="logoutSettingButton"
          className={style.logoutButton}
          onClick={performLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default LogoutSetting;
