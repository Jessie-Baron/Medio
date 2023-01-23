import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import * as followActions from '../store/follower'
import { storyImage } from '../storyImage';
import SideBar from './SideBar';
import './User.css'

function User() {
  const dispatch = useDispatch()
  const userId = Number(useLocation().pathname.split("/")[2]);
  const [user, setUser] = useState({});
  const sessionUser = useSelector(state => state.session.user)
  const storiesObj = useSelector(state => state.stories)
  let followings = useSelector((state) => Object.values(state.follower.following))
  followings = followings.map((user) => user.id)
  const stories = Object.values(storiesObj)
  console.log("this is the stories array", stories)
  const [following, setFollowing] = useState(followings.includes(parseInt(userId)))
  const [isLoaded, setIsLoaded] = useState(false)


  const handleClick = () => {
    if (!following) {
      dispatch(followActions.follow(sessionUser.id, userId))
        .then(() => setFollowing(true))
    } else {
      dispatch(followActions.unfollow(sessionUser.id, userId))
        .then(() => setFollowing(false))
    }
  }

  useEffect(() => {
    if (user) {
      setFollowing(followings.includes(userId));
    }
  }, [dispatch, followings]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(followActions.followingList(sessionUser.id))
        .then(() => setIsLoaded(true))
    }
  }, [dispatch, isLoaded])

  if (!sessionUser) {
    return null;
  }

  return (
    <>
      {isLoaded &&
        <div className='user-page-container'>
          <div className='user-page-holder'>
            <div className='user-page'>
              <SideBar />
              <main className='main-user-page'>
                <div className='user-buttons'>
                  <div className='main-user-top' />
                  <div className='user-action-header'>
                    <div className='action-header-wrapper'>
                      <div className='action-header'>
                        <div className='user-name'>
                          <span>{user.username}</span>
                        </div>
                        <div className='action-bar-top' />
                        <div className='action-bar-wrapper'>
                          <div className='action-bar'>
                            <div className='action-items'>
                              <div className='for-you-action-clicked'>
                                <NavLink to={`/users/${userId}`} className='for-you-link'>
                                  <p className='for-you-link-container'>
                                    <span className='for-you-holder'>
                                      <button className='for-you-button'>Home</button>
                                    </span>
                                  </p>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h4 className='readings'>Readings</h4>
                        {stories.map((story, i) => {
                          if (story.User.id === Number(userId)) return (
                            <div className='user-stories'>
                              <div className='titleAndLogo'>
                                <div className='story-author-feed-holder'>
                                  <div>
                                    <img src={story.User.image_url} alt="Profile" className="profile-image-splash"></img>
                                  </div>
                                  {/* add link on author name */}
                                  <div className='story-author-feed-container'>
                                    <div className='feed-inner-container'>
                                      <NavLink className='story-page-link' to={`/users/${story.User.id}`}>
                                        <h4 className='feed-author-name'>{story.User.username}</h4>
                                      </NavLink>
                                    </div>
                                  </div>
                                </div>
                                <NavLink className='story-page-link' to={`/stories/${story.id}`}><h2>{story?.title}</h2></NavLink>
                              </div>
                              <NavLink className='story-page-link' to={`/stories/${story.id}`}>
                                <img className='story-image-feed' alt="user-story" src={storyImage[i]} />
                              </NavLink>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <div className="user-info-sidebar">
                <div className="user-sidebar">
                  <div className="user-info-sidebar-container">
                    <div className="user-info-sidebar-holder">
                      <div className="user-info-sidebar-wrapper">
                        <div className="user-sidebar-items">
                          <NavLink to={`/users/${user.id}`} className='profile-link'>
                            <div className="profile-picture">
                              <img src={user.image_url}
                                alt="Profile"
                                className="profile-image"
                              ></img>
                              <div className="under-image"></div>
                            </div>
                          </NavLink>
                          <div className="sb-spacer"></div>
                          <NavLink to={`/users/${user.id}`} className='profile-link'>
                            <h2 className="profile-author-name">
                              <span className="user">{user.username}</span>
                            </h2>
                          </NavLink>
                          <div className="follow-button-holder">
                            {sessionUser && followings && followings.length >= 0 && (sessionUser?.id !== userId) && (
                              <button className={following ? "following-user-button" : "follow-user-button"} onClick={handleClick}>{following ? 'Following' : 'Follow'}</button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
export default User;
