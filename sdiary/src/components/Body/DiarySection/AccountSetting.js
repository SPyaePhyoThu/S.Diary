import React, { useState, useContext } from "react";
import classes from "./css/AccountSetting.module.css";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useLogOut } from "../../hooks/useLogOut";
import DiaryContext from "../../context/DiaryContext";

const AccountSetting = () => {
  const { user } = useAuthContext();
  const [name, setName] = useState(user.data.user.name);
  const [email, setEmail] = useState(user.data.user.email);
  const [photoFile, setPhotoFile] = useState("");
  const [passwordCurrent, setPasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [warning, setWarning] = useState([]);
  const [warning1, setWarning1] = useState([]);
  const { logOut } = useLogOut();
  const { userPhoto } = useContext(DiaryContext);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const logOutAfterUpdate = (type) => {
    if (type === "password") {
      setWarning1([
        "Updated Successfully , Please log in again.",
        "Logging Out in 5 seconds",
      ]);
    } else {
      setWarning([
        "Updated Successfully , Please log in again.",
        "Logging Out in 5 seconds",
      ]);
    }

    let countdown = 5;

    const updateWarning = () => {
      if (type === "password") {
        setWarning1([
          "Updated Successfully , Please log in again.",
          `Logging Out in ${countdown} seconds`,
        ]);
      } else {
        setWarning([
          "Updated Successfully , Please log in again.",
          `Logging Out in ${countdown} seconds`,
        ]);
      }

      countdown--;

      if (countdown >= 0) {
        setTimeout(updateWarning, 1000);
      } else {
        logOut();
      }
    };
    updateWarning();
  };

  //on change functions
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };
  const photoChangeHandler = (e) => {
    setPhotoFile(e.target.files[0]);
  };
  const passwordCurrentChangeHandler = (e) => {
    setPasswordCurrent(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const passwordConfirmChangeHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  //Handler functions
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("name", name);
      form.append("email", email);
      form.append("photo", photoFile);

      const response = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/user/updateMe",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: form,
        }
      );
      const json = await response.json();

      if (response.ok) {
        logOutAfterUpdate("data");
      }
      if (!response.ok) {
        setError1(json.message);
        setTimeout(() => {
          setError1("");
        }, 3000);
      }
    } catch (err) {
      setError1(err);
    }
  };

  const passwordSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://sdiary-backend.onrender.com/api/v1/user/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            passwordCurrent: passwordCurrent,
            password: password,
            passwordConfirm: passwordConfirm,
          }),
        }
      );

      if (response.ok) {
        logOutAfterUpdate("password");
      }
      const json = await response.json();

      if (!response.ok) {
        setError2(json.message);
        setTimeout(() => {
          setError2("");
        }, 3000);
      }
    } catch (error) {
      setError2(error);
    }
  };

  return (
    <div className={classes.section}>
      <form onSubmit={submitHandler} className={classes.accountSection}>
        <h1 className={classes.heading}>Account Setting</h1>
        <img src={userPhoto} alt="profile" className={classes.userPhoto} />
        <div className={classes.photoInput}>
          <input
            type="file"
            accept="img/*"
            id="photo"
            className={classes.formUpload}
            onChange={photoChangeHandler}
          />
          <label htmlFor="photo" className={classes.labelPhoto}>
            Choose New Photo
          </label>
        </div>
        <div className={classes.nameInput}>
          <label htmlFor="name" className={classes.label}>
            Full Name
          </label>
          <span className={classes.column}>:</span>
          <input
            className={classes.input}
            type="text"
            id="name"
            value={name}
            onChange={nameChangeHandler}
          />
        </div>
        <div className={classes.emailInput}>
          <label htmlFor="email" className={classes.label}>
            Email
          </label>
          <span className={classes.column}>:</span>
          <input
            className={classes.input}
            type="email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
        </div>
        {!error1 && !warning.length > 0 && (
          <button className={classes.button}>Save Settings</button>
        )}
        {!error1 && warning.length > 0 && (
          <p className={classes.warning}>
            {warning[0]} <span className={classes.warning2}>{warning[1]}</span>
          </p>
        )}
        {error1 && <p className={classes.warning}>{error1}</p>}
      </form>

      <form
        onSubmit={passwordSubmitHandler}
        className={classes.passwordSection}
      >
        <h1 className={classes.heading}>Password Change</h1>
        <div className={classes.passwordInput}>
          <label htmlFor="password" className={classes.label}>
            Current Password
          </label>
          <span className={classes.column}>:</span>
          <input
            type="password"
            id="currentpassword"
            className={classes.input}
            placeholder="••••••••"
            onChange={passwordCurrentChangeHandler}
          />
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password" className={classes.label}>
            New password
          </label>
          <span className={classes.column}>:</span>
          <input
            type="password"
            id="newpassword"
            className={classes.input}
            placeholder="••••••••"
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.passwordInput}>
          <label htmlFor="password" className={classes.label}>
            Password Confirm
          </label>
          <span className={classes.column}>:</span>
          <input
            type="password"
            id="passwordconfirm"
            className={classes.input}
            placeholder="••••••••"
            onChange={passwordConfirmChangeHandler}
          />
        </div>
        {!error2 && !warning1.length > 0 && (
          <button className={classes.button}>Save Password</button>
        )}
        {!error2 && warning1.length > 0 && (
          <p className={classes.warning}>
            {warning1[0]} <span className={classes.warning2}>{warning[1]}</span>
          </p>
        )}
        {error2 && <p className={classes.warning}>{error2}</p>}
      </form>
    </div>
  );
};
export default AccountSetting;
