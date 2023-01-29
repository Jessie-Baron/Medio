import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import * as storyActions from "./store/stories"
import User from "./components/User";
import Profile from "./components/Profile";
import ProfileStories from "./components/ProfileStories"
import { authenticate } from "./store/session";
import StoryForm from "./components/story/StoryForm";
import Stories from "./components/story/Stories";
import StoryDetails from "./components/story/StoryDetails";
import SplashPage from "./components/SplashPage";
import FollowFeed from "./components/Feed/FollowFeed/FollowFeed";
import EditStoryForm from "./components/story/EditStoryForm";
import Home from "./components/Home";
import { ModalProvider } from "./context/Modal";
import NotFound from "./components/NotFound";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const stories = Object.keys(useSelector((state) => state.stories)).map(el=> parseInt(el));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        .then(() => dispatch(storyActions.fetchAllStories()))
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <div className="medio-body">
      <ModalProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {user != null ? <Redirect to="/home" /> : <SplashPage />}
            </Route>
            <Route exact path="/home">
              {user === null ? <Redirect to="/" /> : <Home />}
            </Route>
            <ProtectedRoute path="/new-story" exact={true}>
              <StoryForm />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path="/profile2">
              <ProfileStories />
            </ProtectedRoute>
            <Route path="/stories" exact={true}>
              <Stories user={user} />
            </Route>
            <Route path="/following-feed">
              <FollowFeed />
            </Route>
            <Route path="/stories/:id" exact={true}>
              <StoryDetails stories={stories}/>
            </Route>
            <Route path="/stories/:storyId/edit">
              <EditStoryForm />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;
