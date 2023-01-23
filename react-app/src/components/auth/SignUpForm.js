import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [clipLoading, setClipLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [clip, setClip] = useState(null);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  // const onSignUp = async (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append("clip", clip);

    // if (password === repeatPassword) {
    //   setClipLoading(true);
    //   setHasSubmitted(true);

    //   console.log(formData)
    //   const res = await fetch('/api/clips', {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const res2 = await res.json();

    //   if (res.ok) {
    //     setClipLoading(false);
    //   }
    //   else {
    //     setClipLoading(false);
    //     setHasSubmitted(false)
    //     // error handling
    //         }

    //   const user = {
    //     username,
    //     email,
    //     password,
    //     bio,
    //     imageUrl: res2.url
    //   }

    //   const data = await dispatch(signUp(user));
    //   if (data) {
    //     setErrors(data)
    //   }
    // }
    // else {
    //   setErrors(["Passwords must match"])
    //   console.log(errors)
    //   return;
    // }
  // };

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
    return <Redirect to='/' />;
  }

  return (
    <form>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
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
            type="file"
            className="file-drop"
            accept="clip/*"
            encType="multipart/form-data"
            onChange={updateClip}
            required
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
