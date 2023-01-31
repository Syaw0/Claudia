import IconLogo from "../../../assets/icons/iconLogo";
import LoginForm from "../../../components/login/login";
import style from "./Authentication.module.css";
import ForgetPassword from "../../../components/forgetPassword/forgetPassword";
import Signup from "../../../components/signup/signup";
import TwoFactorAuthentication from "../../../components/twoFactorAuthentication/twoFactorAuthentication";
import ResetPassword from "../../../components/resetPassword/resetPassword";
import { useDispatch } from "react-redux";
import { useAuthenticateSelector } from "../../../store/authentication/authenticationStoreHooks";

const Authentication = () => {
  const currentComponent = useAuthenticateSelector((s) => s.currentComponent);
  const dispatch = useDispatch();

  return (
    <div className={style.holder}>
      <div className={style.componentHolder}>
        <div className={style.logoHolder}>
          <IconLogo className={style.logo} width={"200"} height={"100"} />
        </div>
        {currentComponent === "login" && <LoginForm />}
        {currentComponent === "signup" && <Signup />}
        {currentComponent === "forgetPassword" && <ForgetPassword />}
        {currentComponent === "resetPassword" && <ResetPassword />}
        {currentComponent === "tfa" && <TwoFactorAuthentication />}
      </div>
    </div>
  );
};

export default Authentication;
