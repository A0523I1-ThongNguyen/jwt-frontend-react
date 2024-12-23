import { Link, useHistory } from "react-router-dom";
import "./register.scss";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "../../service/UserService";

const Register = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultVaild = {
    isVaildEmail: true,
    isVaildPhone: true,
    isVaildUsername: true,
    isVaildPassword: true,
    isVaildConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultVaild);

  const history = useHistory();

  const handleRegister = async () => {
    //Khi nhấn đăng kí : phải validate, nếu hợp lệ > gọi server tạo người dùng > lấy response server(gắn biến)>check ddkien thành công và thất bại
    let checkValidate = validate();
    if (checkValidate === true) {
      let res = await createUser(email, phone, userName, password);
      if (+res.data.EC === 0) {
        toast.success(res.data.EM);
        history.push("/login");
      } else {
        toast.error(res.data.EM);
      }
    }

    // axios.post("http://localhost:8081/api/v1/register", {
    //   email,
    //   phone,
    //   userName,
    //   password,
    // });

    // let newAccountData = {
    //   email,
    //   phone,
    //   userName,
    //   password,
    //   confirmPassword,
    //   // meo: email,
    //   // dt: phone,
    //   // tk: userName,
    //   // mk: password,
    //   // xn: confirmPassword,
    // };
    // console.log("info new account :", newAccountData);
  };

  const handleLogin = () => {
    history.push("/login");
  };

  // useEffect(() => {
  //   axios.get("http://localhost:8081/api/v1/getlist").then((data) => {
  //     // console.log("check HTTP request ", data);
  //     // console.log("check data request ", data.data);
  //   });
  // });

  const validate = () => {
    setObjCheckInput(defaultVaild);
    if (!email) {
      setObjCheckInput({ ...defaultVaild, isVaildEmail: false });
      toast.error("Email not empty");
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      // method test return about true/false
      setObjCheckInput({ ...defaultVaild, isVaildEmail: false });
      toast.error("Email is not vaild");
      return false;
    }

    if (!phone) {
      setObjCheckInput({ ...defaultVaild, isVaildPhone: false });
      toast.error("Phone not empty");
      return false;
    }

    if (!password) {
      setObjCheckInput({ ...defaultVaild, isVaildPassword: false });
      toast.error("Password not empty");
      return false;
    }

    if (password != confirmPassword) {
      setObjCheckInput({ ...defaultVaild, isVaildConfirmPassword: false });
      toast.error("confirmPassword is not same password");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="register-container">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-right col-12 col-sm-5 d-flex flex-column gap-2 py-3 py-sm-3">
              <div className="brand text-center d-sm-none">Facebook</div>

              <div className="form-group">
                <h1 style={{ color: "brown" }}>Register account</h1>
                <label style={{ color: "white" }}>Email:</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  className={
                    objCheckInput.isVaildEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Email address"
                />
              </div>

              <div className="form-group">
                <label style={{ color: "white" }}>Phone:</label>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="text"
                  className={
                    objCheckInput.isVaildPhone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Phone number"
                />
              </div>

              <div className="form-group">
                <label style={{ color: "white" }}>Username:</label>
                <input
                  value={userName}
                  onChange={(event) => setUsername(event.target.value)}
                  type="text"
                  className={
                    objCheckInput.isVaildUsername
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Username"
                />
              </div>

              <div className="form-group">
                <label style={{ color: "white" }}>Password:</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className={
                    objCheckInput.isVaildPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Password"
                />
              </div>

              <div className="form-group">
                <label style={{ color: "white" }}>Re-entry Password:</label>
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  className={
                    objCheckInput.isVaildConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Re-entry password"
                />
              </div>

              <button
                onClick={() => handleRegister()}
                className="btn btn-primary mt-3"
              >
                Register
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
                  onClick={() => handleLogin()}
                >
                  Login
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

export default Register;
