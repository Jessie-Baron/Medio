import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import * as storyDetailActions from "../store/storyDetails"
import SideBar from './SideBar';
import './User.css'
import { storyImage } from '../storyImage';

function Home() {
  const dispatch = useDispatch()
  const history = useHistory()
  const stories = Object.values(useSelector(state => state.stories))
  const [forButton, setForButton] = useState(true)
  const [followingButton, setFollowingButton] = useState(false)

  const storyPage = async (story, e) => {
    e.preventDefault()
    dispatch(storyDetailActions.fetchStoryDetails(story.id))
      .then(() => history.push(`/stories/${story.id}`))
  }

  const forYou = () => {
    if (forButton) return
    setForButton(true)
    setFollowingButton(false)
  }

  const following = () => {
    if (followingButton) return
    setFollowingButton(true)
    setForButton(false)
  }

  return (
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
                    <div className='action-bar-top' />
                    <div className='action-bar-wrapper'>
                      <div className='action-bar'>
                        <div className='action-items'>
                          <div className={forButton ? 'for-you-action-clicked' : 'for-you-action'}>
                            <a className='for-you-link'>
                              <p className='for-you-link-container'>
                                <span className='for-you-holder'>
                                  <button className='for-you-button' onClick={forYou}>For You</button>
                                </span>
                              </p>
                            </a>
                          </div>
                          <div className={followingButton ? 'following-action-clicked' : 'following-action'}>
                            <NavLink to={`/following-feed`} className='following-link'>
                              <p className='following-container'>
                                <span className='following-holder'>
                                  <button className='following-button' onClick={following}>Following</button>
                                </span>
                              </p>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='user-feed-body'>
                <div className='user-buttons'>
                  <div>
                    <div className='user-buttons'>
                      {stories.map((story, i) => (
                        <div className="story-card">
                          <div className='story-feed-item' onClick={(e) => storyPage(story, e)}>
                            <div className='story-feed-item-holder'>
                              <div className='story-card-preview'>
                                <div className="story-author">
                                  <div className='story-author-feed-holder'>
                                    <div>
                                      <img src={story.User.image_url} alt="Profile" className="profile-image-splash"></img>
                                    </div>
                                    {/* add link on author name */}

                                    <div className='story-author-feed-container'>
                                      <div className='feed-inner-container'>
                                        <h4 className='feed-author-name cursor-added'>{story.User.username}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <NavLink className='story-page-link' to={`/stories/${story.id}`}>
                                  <h2>{story.title}</h2>
                                  <div className='story-body-preview'>
                                    {/* <h3 className='story-feed-body'>{story.body}</h3> */}
                                  </div>
                                </NavLink>
                              </div>
                              <NavLink className='story-page-link' to={`/stories/${story.id}`}>
                                <img className='story-image-feed' src={storyImage[i]} />
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div className='right-sidebar'></div>
        </div>
      </div>
    </div>
  );
}
export default Home;
