import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SideBar from '../../SideBar'
import { storyImage } from '../../../storyImage';
import * as followActions from "../../../store/follower"
import * as storyDetailActions from "../../../store/storyDetails"

export default function FollowFeed() {
    const dispatch = useDispatch()
    const history = useHistory()
    const stories = Object.values(useSelector(state => state.stories))
    const followingList = Object.keys(useSelector(state => state.follower.following)).map((ele => parseInt(ele)))
    const followingStories = stories.filter(ele => followingList.includes(ele.user_id))
    const currentUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const [forButton, setForButton] = useState(false)
    const [followingButton, setFollowingButton] = useState(true)

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

    useEffect(() => {
        dispatch(followActions.followingList(currentUser.id))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded, currentUser.id])

    return (
        <>
            {isLoaded && (
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
                                                                <NavLink to={`/home`} className='for-you-link'>
                                                                    <p className='for-you-link-container'>
                                                                        <span className='for-you-holder'>
                                                                            <button className='for-you-button' onClick={forYou}>For You</button>
                                                                        </span>
                                                                    </p>
                                                                </NavLink>
                                                            </div>
                                                            <div className={followingButton ? 'following-action-clicked' : 'following-action'}>
                                                                <a className='following-link'>
                                                                    <p className='following-container'>
                                                                        <span className='following-holder'>
                                                                            <button className='following-button' onClick={following}>Following</button>
                                                                        </span>
                                                                    </p>
                                                                </a>
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
                                                    {followingStories.map((story, i) => (
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
            )}
        </>
    )
}
