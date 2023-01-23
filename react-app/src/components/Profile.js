import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import SideBar from './SideBar';
import * as followActions from '../store/follower'
import './User.css'

function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const followingUsers = useSelector(state => state.follower.following)
    const followingList = Object.values(followingUsers)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(followActions.followingList(sessionUser.id))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded, sessionUser.id])

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
                                                            <div className='for-you-action-clicked'>
                                                                <NavLink to={`/profile`} className='for-you-link'>
                                                                    <p className='for-you-link-container'>
                                                                        <span className='for-you-holder'>
                                                                            <button className='for-you-button'>About</button>
                                                                        </span>
                                                                    </p>
                                                                </NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2>Following List</h2>
                                                </div>
                                                {followingList.map(user => (
                                                    < div className='profile-page-link-holder'>
                                                        <NavLink className='profile-page-link-e' to={`/users/${user?.id}`}>
                                                            <span>{user.username}</span>
                                                        </NavLink>
                                                        <div>
                                                            <button className='following-user-button' onClick={() => { dispatch(followActions.unfollow(sessionUser.id, user.id)) }}>Unfollow</button>
                                                        </div>
                                                    </div>
                                                ))}
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
