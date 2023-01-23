import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [email])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, bio, imageUrl, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['password: Passwords do not match.'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="width500">
      <form onSubmit={onSignUp} className="flexCol centerCol">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <center>
          <h2>Join Medio.</h2>
        </center>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          className="width200 signUpMargin"
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="width200 signUpMargin"
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
        <textarea
          type="text"
          name="bio"
          placeholder="Tell us about yourself"
          className="width200 signUpMargin"
          onChange={updateBio}
          value={bio}
          required={true}
        ></textarea>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="width200 signUpMargin"
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
        <input
          type="password"
          name="repeat_password"
          placeholder="Repeat Password"
          className="width200 signUpMargin"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <input
          type="text"
          name="imageUrl"
          placeholder="Upload a Picture!"
          className="width200 signUpMargin"
          onChange={updateImageUrl}
          value={imageUrl}
          required={true}
        ></input>

        <button type="submit" className="signUpButton signUpMargin">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
