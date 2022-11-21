import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as storyActions from "../../../store/stories"
import StoryCard from './StoryCard'
import './StoryFeed.css'

export default function StoryFeed() {
    const dispatch = useDispatch()
    const stories = Object.values(useSelector(state => state.stories))
    const [isLoaded, setIsLoaded] = useState(false)

    let trendingArr = []
    let authorArr = []

    if (isLoaded && stories.length >= 6) {
        for (let i = 0; i < 6; i++) {
            trendingArr.push({ 'body': stories[i].body, 'title': stories[i].title, 'id': stories[i].id, 'user_id': stories[i].user_id })
            authorArr.push({ 'username': stories[i].User.username, 'email': stories[i].User.email, 'id': stories[i].User.id })
        }
    }

    useEffect(() => {
        dispatch(storyActions.fetchAllStories())
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <div className='story-section'>
            <div className='trending'>
                <div className='trending-container'>
                    <div className='trending-inner-container'>
                        <div className='trending-holder'>
                            <div className='trending-title-top'>
                                <div><i className="fa-solid fa-chart-line fa-lg" style={{ marginRight: '10px' }}></i></div>
                                <div className='title-holder'>
                                    {stories.length >= 6 ? <p className='title-line'>Trending on Medium</p> : <p className='title-line'>Looks like we have no top stories to share. Write one for the world to see!</p>}
                                </div>
                            </div>
                            <div className='trending-stories-holder'>
                                <div className='trending-stories'>
                                    {stories[0] && trendingArr.map(story => (
                                        <div className='trending-story-container'>
                                            <div className='trending-story-holder'>
                                                <div className='trending-inner-story'>
                                                    <div className='trending-story'>
                                                        <span className='story-numbers'>0{trendingArr.indexOf(story) + 1}</span>
                                                    </div>
                                                    <div className='trending-preview'>
                                                        <div className='details'>
                                                            <div className='story-author-container'>
                                                                <div className='author-name'>
                                                                    {/* turn username into link. link goes here */}
                                                                    <h4 className='author'>{authorArr[trendingArr.indexOf(story)].username}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='details'>
                                                            {/* turn body into link. link goes here */}
                                                            <div>
                                                                <h2 className='trending-title'>{story.title}</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='story-body'>
                <div className='story-body-container'>
                    <div className='story-body-holder'>
                        <div className='story-body-grid'>
                            <section className='story-feed'>
                                <div className='story-feed-holder'>
                                    <div>
                                        <div className='all-story-feed'>
                                            <StoryCard stories={stories} />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
