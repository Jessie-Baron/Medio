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
  const [clip, setClip] = useState(null);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [clipLoading, setClipLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {

  }, [email])

  const onSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("clip", clip)

    if (password === repeatPassword) {
      setClipLoading(true);
      setHasSubmitted(true);

      console.log(formData)
      const res = await fetch('/api/clips', {
        method: "POST",
        body: formData,
      });

      const res2 = await res.json();

      if (res.ok) {
        setClipLoading(false);
      }
      else {
        setClipLoading(false);
        setHasSubmitted(false)
        // error handling
            }

      const user = {
        username,
        email,
        password,
        bio,
        imageUrl: res2.url
      }

      const data = await dispatch(signUp(user));
      if (data) {
        setErrors(data)
      }
    }
    else {
      setErrors(["Passwords must match"])
      console.log(errors)
      return;
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

    const updateClip = (e) => {
    const file = e.target.files[0];
    setClip(file);
  }

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
         <center>
        <h5 className="upload-signup-header">Upload a Profile Picture!</h5>
        </center>
        <input
            type="file"
            className="width200 signUpMargin"
            accept="clip/*"
            encType="multipart/form-data"
            onChange={updateClip}
            required
        ></input>

        <button type="submit" className="signUpButton signUpMargin">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
