import { Link, useHistory } from "react-router-dom";
import "./login.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../service/UserService";

const Login = () => {
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const defaultVaild = {
    isValueLogin: true,
    isValuePassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultVaild);

  const history = useHistory();

  const handleCreateAccount = () => {
    history.push("/register");
  };

  const handleLogin = async () => {
    setObjCheckInput(defaultVaild);
    if (!valueLogin) {
      setObjCheckInput({ ...defaultVaild, isValueLogin: false });
      toast.error("Please enter your email address or phone number!");
      return;
    }
    if (!valuePassword) {
      setObjCheckInput({ ...defaultVaild, isValuePassword: false });
      toast.error("Please enter your password");
      return;
    }

    const response = await loginUser(valueLogin, valuePassword);
    if (response && response.data && +response.data.EC === 0) {
      toast.success("Dang nhap thanh cong");

      let dataSession = {
        isAuthenticate: true,
        token: "fake token",
      };
      sessionStorage.setItem("account", JSON.stringify(dataSession));

      history.push("/users");
      toast.success(response.data.EM);
      window.location.reload();
    }
    if (response && response.data && +response.data.EC !== 0) {
      toast.error(response.data.EM);
    }
  };

  const handleEnter = (event) => {
    console.log(event);
    if (event.key === "Enter" && event.keyCode === 13) {
      handleLogin();
    }
  };

  // nếu đã đăng nhập mà vẫn vào login thì auto push vào trang users
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      history.push("/users");
      window.location.reload();
    }
  });

  return (
    <>
      <div className="login-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left d-none d-sm-block col-sm-7">
              <div className="brand">Facebook</div>

              <div className="detail">Say what needs to be said</div>
            </div>
            <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3 py-sm-3">
              <div className="brand text-center d-sm-none">Facebook</div>
              <input
                type="text"
                className={
                  objCheckInput.isValueLogin
                    ? "form-control"
                    : "is-invalid form-control"
                }
                placeholder="Email address or phone number"
                value={valueLogin}
                onChange={(event) => setValueLogin(event.target.value)}
              />
              <input
                type="password"
                className={
                  objCheckInput.isValuePassword
                    ? "form-control"
                    : "is-invalid form-control"
                }
                placeholder="Password"
                value={valuePassword}
                onChange={(event) => setValuePassword(event.target.value)}
                onKeyDown={(event) => handleEnter(event)}
              />
              <button className="btn btn-primary" onClick={() => handleLogin()}>
                Login
              </button>
              <span className="text-center">
                <a className="forgot-password" href="#">
                  Forgot your password?
                </a>
              </span>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateAccount()}
                >
                  Create new account
                  {/* <Link to="/register">Create new account</Link> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
