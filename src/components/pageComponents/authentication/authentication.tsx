import IconLogo from "../../../assets/icons/iconLogo";
import LoginForm from "../../login/login";
import style from "./authentication.module.css";
import ForgetPassword from "../../forgetPassword/forgetPassword";
import Signup from "../../signup/signup";
import TwoFactorAuthentication from "../../twoFactorAuthentication/twoFactorAuthentication";
import ResetPassword from "../../resetPassword/resetPassword";
import { useAuthenticateSelector } from "../../../store/authentication/authenticationStoreHooks";

const Authentication = () => {
  const currentComponent = useAuthenticateSelector((s) => s.currentComponent);

  return (
    <div className={style.holder}>
      <div className={style.componentHolder}>
        <div data-testid="authenticationPageLogo" className={style.logoHolder}>
          <IconLogo className={style.logo} width={"200"} height={"100"} />
        </div>
        {currentComponent === "login" && <LoginForm />}
        {currentComponent === "signup" && <Signup />}
        {currentComponent === "forgetPassword" && <ForgetPassword />}
        {currentComponent === "resetPassword" && <ResetPassword />}
        {currentComponent === "tfa" && (
          <TwoFactorAuthentication resetTime={120} />
        )}
      </div>
    </div>
  );
};

export default Authentication;
