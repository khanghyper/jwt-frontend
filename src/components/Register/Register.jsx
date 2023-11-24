import { useState, useCallback } from "react";
import FormInput from "../FormInput/FormInput";
import axios from "axios";

const validateEmail = (em) => {
  // Sử dụng regular expression để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Kiểm tra xem chuỗi có khớp với regular expression không
  if (em === "")
    return { isValid: false, message: "Không được để trống email" };
  if (!emailRegex.test(em) && em !== undefined)
    return { isValid: false, message: "Email không hợp lệ!" };
  return { isValid: true };
};

const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  if (phone === undefined) return { isValid: true };
  if (phone === "")
    return { isValid: false, message: "Không được để trống số điện thoại" };
  if (!phoneRegex.test(phone))
    return { isValid: false, message: "số điện thoại không hợp lệ" };
  return { isValid: true };
};

const validateUserName = (userName) => {
  if (userName === undefined) return { isValid: true };
  if (userName === "")
    return { isValid: false, message: "Không được để trống username" };
  if (userName.length < 6)
    return { isValid: false, message: "username phải từ 6 ký tự!" };
  return { isValid: true };
};

const validatePassword = (password) => {
  if (password === undefined) return { isValid: true };
  if (password === "")
    return { isValid: false, message: "Không được để trống password" };
  return { isValid: true };
};

const validatePassword2 = (password, password2) => {
  if (password2 === undefined) return { isValid: true };
  if (password !== password2)
    return { isValid: false, message: "mật khẩu không khớp " };
  return { isValid: true };
};

const Register = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [password2, setPassword2] = useState(undefined);
  const defaultValidInput = {
    isValidEmail: false,
    isValidPhone: false,
    isValidUserName: false,
    isValidPassword: false,
    isValidPassword2: false,
  };
  const [infoValid, setInfoValid] = useState(defaultValidInput);

  const checkEmail = validateEmail(email);
  const checkPhone = validatePhone(phone);
  const checkUserName = validateUserName(userName);
  const checkPassword = validatePassword(password);
  const checkPassword2 = validatePassword2(password, password2);

  const handleEmail = useCallback((e) => {
    setInfoValid((prev) => ({
      ...prev,
      isValidEmail: validateEmail(e.target.value).isValid,
    }));
    setEmail(e.target.value);
  }, []);

  const handlePhone = useCallback((e) => {
    setInfoValid((prev) => ({
      ...prev,
      isValidPhone: validatePhone(e.target.value).isValid,
    }));
    setPhone(e.target.value);
  }, []);

  const handleUserName = useCallback((e) => {
    setInfoValid((prev) => ({
      ...prev,
      isValidUserName: validateUserName(e.target.value).isValid,
    }));
    setUserName(e.target.value);
  }, []);

  const handlePassword = useCallback((e) => {
    setInfoValid((prev) => ({
      ...prev,
      isValidPassword: validatePassword(e.target.value).isValid,
    }));
    setPassword(e.target.value);
  }, []);

  const handlePassword2 = useCallback((e) => {
    setInfoValid((prev) => ({
      ...prev,
      isValidPassword2: validatePassword2(password, e.target.value).isValid,
    }));
    setPassword2(e.target.value);
  }, [password]); 

  
  const handleRegister = (e) => {
    e.preventDefault();
    if(infoValid.isValidEmail === true && infoValid.isValidPassword === true
      && infoValid.isValidPassword2 === true && infoValid.isValidUserName === true
      && infoValid.isValidPhone === true
    ) {
      axios.post('http://localhost:8081/api/v1/user/register',{
        email,
        userName,
        phone,
        password
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
    }else{
      console.log('sai');
    }
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-6">test</div>
        <div className="col-6 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
          <form>
            <FormInput
              title={"email"}
              type={"text"}
              example={"example@gmail.com"}
              onHandleData={handleEmail}
              isValid={checkEmail.isValid}
              value={email || ""}
            />
            <div className="message text-danger">
              {checkEmail.isValid ? "" : checkEmail.message}
            </div>
            <FormInput
              title={"số điện thoại"}
              type={"text"}
              example={"0396547124"}
              value={phone || ""}
              onHandleData={handlePhone}
              isValid={checkPhone.isValid}
            />
            <div className="message text-danger">
              {checkPhone.isValid ? "" : checkPhone.message}
            </div>
            <FormInput
              title={"username"}
              type={"text"}
              example={"example"}
              value={userName || ""}
              onHandleData={handleUserName}
              isValid={checkUserName.isValid}
            />
            <div className="message text-danger">
              {checkUserName.isValid ? "" : checkUserName.message}
            </div>
            <FormInput
              title={"password"}
              type={"password"}
              value={password || ""}
              example={"mật khẩu"}
              isValid={checkPassword.isValid}
              onHandleData={handlePassword}
            />
            <div className="message text-danger">
              {checkPassword.isValid ? "" : checkPassword.message}
            </div>
            <FormInput
              title={"nhập lại password"}
              type={"password"}
              example={"nhập lại mật khẩu"}
              value={password2 || ""}
              isValid={checkPassword2.isValid}
              onHandleData={handlePassword2}
            />
            <div className="message text-danger">
              {checkPassword2.isValid ? "" : checkPassword2.message}
            </div>
            <button onClick={handleRegister} className="btn btn-primary">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
