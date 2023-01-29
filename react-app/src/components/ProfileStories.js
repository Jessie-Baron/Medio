import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import { storyImage } from '../storyImage';
import * as followActions from '../store/follower'
import * as storyActions from "../store/stories";
import './User.css'

function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const followingUsers = useSelector(state => state.follower.following)
    const followingList = Object.values(followingUsers)
    const stories = Object.values(useSelector(state => state.stories))
    const filtered = stories.filter(story => story.User.id === sessionUser.id)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(followActions.followingList(sessionUser.id))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded, sessionUser.id])

    useEffect(() => {
        dispatch(storyActions.fetchAllStories());
    }, [dispatch]);

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
                                                    <span>{sessionUser.username}</span>
                                                </div>
                                                <div className='action-bar-top' />
                                                <div className='action-bar-wrapper'>
                                                    <div className='action-bar'>
                                                        <div className='action-items'>
                                                            <NavLink to={`/profile`} className='for-you-link' id='for-you-1'>
                                                                <p className='for-you-link-container'>
                                                                    <span className='for-you-holder'>
                                                                        <button className='for-you-button'>Following</button>
                                                                    </span>
                                                                </p>
                                                            </NavLink>
                                                            <div className='for-you-action-clicked'>
                                                                <NavLink to={`/profile2`} className='for-you-link' id='for-you-2'>
                                                                    <p className='for-you-link-container'>
                                                                        <span className='for-you-holder'>
                                                                            <button className='for-you-button'>Stories</button>
                                                                        </span>
                                                                    </p>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2>Your Stories</h2>
                                                </div>
                                                {filtered.map((story, i) => (
                                                    <div className='user-stories'>
                                                      <div className='titleAndLogo'>
                                                        <div className='story-author-feed-holder'>
                                                          <div>
                                                            <img src={story.User.image_url} alt="Profile" className="profile-image-splash"></img>
                                                          </div>
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
                                                )}
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
                                                    <NavLink to={`/profile`} className='profile-link'>
                                                        <div className="profile-picture">
                                                            <img src={sessionUser.image_url}
                                                                alt="Profile"
                                                                className="profile-image"
                                                            ></img>
                                                            <div className="under-image"></div>
                                                        </div>
                                                    </NavLink>
                                                    <div className="sb-spacer"></div>
                                                    <NavLink to={`/profile`} className='profile-link'>
                                                        <h2 className="profile-author-name">
                                                            <span className="user">{sessionUser.username}</span>
                                                        </h2>
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}
export default Profile;
