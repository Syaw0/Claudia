import IconLogo from "../../../assets/icons/iconLogo";
import LoginForm from "../../../components/login/login";
import style from "./Authentication.module.css";
import ForgetPassword from "../../../components/forgetPassword/forgetPassword";
import Signup from "../../../components/signup/signup";
import TwoFactorAuthentication from "../../../components/twoFactorAuthentication/twoFactorAuthentication";
import ResetPassword from "../../../components/resetPassword/resetPassword";

const Authentication = () => {
  return (
    <div className={style.holder}>
      <div className={style.componentHolder}>
        <div className={style.logoHolder}>
          <IconLogo className={style.logo} width={"200"} height={"100"} />
        </div>
        {/* <LoginForm /> */}
        {/* <ForgetPassword /> */}
        <Signup />
        {/* <TwoFactorAuthentication /> */}
        {/* <ResetPassword /> */}
      </div>
    </div>
  );
};

export default Authentication;
