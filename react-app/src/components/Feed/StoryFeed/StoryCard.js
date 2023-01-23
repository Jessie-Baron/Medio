import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import * as storyDetailActions from '../../../store/storyDetails'
import { storyImage } from '../../../storyImage'

export default function StoryCard({ stories }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const storyPage = async (story, e) => {
        e.preventDefault()
        dispatch(storyDetailActions.fetchStoryDetails(story.id))
            .then(() => history.push(`/stories/${story.id}`))
    }
    return (
        <>
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
                                        <div className='story-author-feed-container'>
                                            <div className='feed-inner-container'>
                                                <h4 className='feed-author-name'>{story.User.username}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <NavLink className='story-page-link' to={`/stories/${story.id}`}>
                                    <h2>{story.title}</h2>
                                    <div className='story-body-preview'>
                                        {/* <h3 className='story-feed-body'>{story.body.substring(1, story.body.length - 1).replace(/""/gi, `"`)}</h3> */}
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
        </>
    )
}
