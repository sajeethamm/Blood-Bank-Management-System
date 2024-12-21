import { userLogin, userRegister } from "../redux/features/auth/authActions.js";
import store from "../redux/store.js";

export const handleLogin = (e, email, password, role) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please Privde All Feilds");
    }
    store.dispatch(userLogin({ email, password, role }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organizationName,
  address,
  hospitalName
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        name,
        role,
        email,
        password,
        phone,
        organizationName,
        address,
        hospitalName,
      })
    );
  } catch (error) {
    console.log(error);
  }
};