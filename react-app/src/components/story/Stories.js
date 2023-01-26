import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLikeStory } from "../../store/likeStory";
import * as storyActions from "../../store/stories";
import * as storyDetailsActions from "../../store/storyDetails";
import SideBar from "../SideBar";
import "./Story.css";

const Stories = ({ user }) => {
  // const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const stories = Object.values(useSelector((state) => state.stories));
  let userStories;
  if (!user) {
    history.push('/')
  } else {
    userStories = stories.filter((story) => {
      return story.User.id === user.id;
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(storyActions.fetchAllStories());
  }, [dispatch]);

  const storyDetails = async (story, e) => {
    e.preventDefault();
    await dispatch(storyDetailsActions.fetchStoryDetails(story.id));
    await dispatch(getLikeStory(story.id));
    history.push(`/stories/${story.id}`);
  };

  return (
    <div className="story-page-container">
      <div className="story-page-holder">
        <div className="story-page">
          <SideBar />
          <main className="story-main">
            <div className="story-main-container">
              <div className="your-story-body bottomBorder">
                <div className="body-holder">
                  <div className="your-story-header">
                    <div className="margin-padding flexRo">
                      <div className="spread container">
                        <div className="header-wrapper">
                          <h1 className="fontSize42">Your Stories</h1>
                        </div>
                        <div className="write-button-container">
                          <button
                            className="writeStory"
                            onClick={() => history.push("/new-story")}
                          >
                            Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="noBullets">
                    {userStories &&
                      userStories[0] &&
                      userStories.map((story) => (
                        <li className="topBorder titlePadding">
                          <h4
                            className="widthFit cursorPointer"
                            onClick={(e) => storyDetails(story, e)}
                          >
                            {story.title}
                          </h4>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </main>
          <div className="right-sidebar"></div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
