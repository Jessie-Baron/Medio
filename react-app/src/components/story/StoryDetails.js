import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams, NavLink } from "react-router-dom";
import SideBar from "../SideBar";
import * as storyDetailsActions from "../../store/storyDetails";
import * as storyActions from "../../store/stories";
import * as followActions from '../../store/follower'
import "./Story.css";
import { getLikeStory, likeStory } from "../../store/likeStory";
import { getComments, deleteComment } from "../../store/comment";
import RichEditor2 from "../editor/RichEditor2";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";
import LikeStory from "../likeButton/LikeStory";
import LikeComment from "../likeButton/LikeComment";

const StoryDetails = ({ stories }) => {
  const story = useSelector((state) => state.storyDetails);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const data = await dispatch(
        storyDetailsActions.fetchStoryDetails(storyId)
      );
    })();
  }, [dispatch]);
  const user = useSelector((state) => state.session.user);
  const body = useSelector((state) => [state.storyDetails.body]);
  const commentsObj = useSelector((state) => state.comment.allComments);
  const comments = Object.values(commentsObj);
  const storyId = Number(useLocation().pathname.split("/")[2]);
  let followings = useSelector((state) => Object.values(state.follower.following))
  followings = followings.map((user) => user.id)
  const [showMenu, setShowMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [following, setFollowing] = useState(followings.includes(story.user_id))
  const [editId, setEditId] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  // if (story.body) {
  //   setBody("this")
  // }

  const { id } = useParams();
  const likes = useSelector((state) => state.likeStory);
  const likeInfo = likes[id];
  const allLikeUser = likeInfo?.allUser;

  useEffect(() => {
    dispatch(getLikeStory(id));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFollowing(followings.includes(story.user_id));
    }
  }, [dispatch, followings]);

  useEffect(() => {
    if (user) {
      dispatch(followActions.followingList(user.id))
      .then(() => setIsLoaded(true))
    }
  }, [dispatch, isLoaded]);

  const handleDelete = async (commentId, storyId) => {
    await dispatch(deleteComment(commentId, storyId))
  };


  const handleClick = () => {
    if (!following) {
      dispatch(followActions.follow(user.id, story.user_id))
        .then(() => setFollowing(true))
    } else {
      dispatch(followActions.unfollow(user.id, story.user_id))
        .then(() => setFollowing(false))
    }
  }

  const openMenu = () => {
    // if (showMenu) return;
    if (!showMenu) setShowMenu(true);
    if (showMenu) setShowMenu(false);
  };

  const deleteStory = async () => {
    await dispatch(storyActions.fetchDeleteStory(storyId));
    // await dispatch(storyDetailsActions.deleteStoryDetails());
    history.push('/stories')
  };
  if (!stories.includes(storyId)) history.push("/stories");

  return (
    <div className="story-page-container">
      {
        <div className="story-page-holder">
          <div className="story-page">
            <SideBar />
            <main className="story-main">
              <div className="story-holder">
                <div className="flexCol margin-padding">
                  <div className="width700">
                    <div className="story-width">
                      <article>
                        <div className="story-main-top">
                          <div className="story-main-top">
                            <header className="story-header-section">
                              <div className="story-header-user">
                                <div className="story-user-holder">
                                  <div className="user-image-wrapper">
                                    <div className="user-image">
                                      <img
                                        src={story.User?.image_url}
                                        alt="Profile"
                                        className="profileImage"
                                      ></img>
                                      <span>{story.User?.username}</span>
                                      {story.User?.id === user?.id && (
                                        <div className="flexRow flexEnd">
                                          <button
                                            className="profButtons"
                                            onClick={() =>
                                              history.push(
                                                `/stories/${story.id}/edit`
                                              )
                                            }
                                          >
                                            Edit
                                          </button>
                                          <button onClick={deleteStory} className="profButtons">
                                            Delete
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </header>
                            <section>
                              <div className="story-page-body">
                                <div>
                                  <h1 className="title-padding">
                                    {story?.title}
                                  </h1>
                                </div>
                                <div>
                                  {body[0] &&
                                    body.map((el) => {
                                      const contentState = convertFromRaw(
                                        JSON.parse(el)
                                      );
                                      const editorState =
                                        EditorState.createWithContent(
                                          contentState
                                        );
                                      return (
                                        <RichEditor2
                                          editorState={editorState}
                                          readOnly={true}
                                        />
                                      );
                                    })}
                                </div>
                              </div>
                            </section>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
                {user && <div className="user-interactions">
                  <div className="user-interactions-wrapper">
                    <div className="like-items">
                      <div className="likeStory">
                        <LikeStory />
                      </div>
                    </div>
                    <hr className="like-divider" />
                    <div className="comments">
                      {showMenu && (
                        <div className="comments-sidebar">
                          <div className="comments-headline">
                            <img
                              src={user?.image_url}
                              alt="Profile"
                              className="profileImage"
                            ></img>
                            <h2>{user?.username}</h2>
                          </div>
                          <div className="textarea-comments">
                            <CommentForm />
                          </div>
                          {story.Comments?.map((comment) => (
                            <div>
                              <div className="item-header">
                                <img
                                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                  alt="Profile"
                                  className="profileImage"
                                ></img>
                                <div>{comment.User.username}</div>
                              </div>
                              <div className="comment-body">{comment.body}</div>
                              {/* <div className="likeComment">
                                <div>
                                  <LikeComment comment={comment} />
                                </div>
                              </div> */}

                              {comment?.user_id === user?.id && (
                                <div className="comment-buttons">
                                  <div
                                    className="detailButton1"
                                    onClick={() => handleDelete(comment.id, storyId)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </div>
                                  <div
                                    id={comment.id}
                                    value={comment.id}
                                    className="detailButton2"
                                    onClick={() => {
                                      if (editId === comment.id) {
                                        setEditId(-1);
                                        setEditId("");
                                        return;
                                      }
                                      setEditId(comment.id);
                                      setCommentBody(comment.body);
                                    }}
                                  >
                                    <i className="fa-solid fa-pen"></i>
                                  </div>
                                </div>
                              )}
                              <div className="editform">
                                {editId === comment.id && (
                                  <CommentEditForm
                                    className="comment-edit-form"
                                    comment={comment}
                                    setCommentBody={setCommentBody}
                                    commentBody={commentBody}
                                    setEditId={setEditId}
                                  />
                                )}
                              </div>
                              <hr className="divider-comments" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div onClick={openMenu} className="comment-icon">
                      <div>
                        <i className="fa-regular fa-comment"></i>
                      </div>
                      <div>{story?.Comments?.length}</div>
                    </div>
                  </div>
                </div>}
              </div>
            </main>
            <div className="user-info-sidebar">
              <div className="user-sidebar">
                <div className="user-info-sidebar-container">
                  <div className="user-info-sidebar-holder">
                    <div className="user-info-sidebar-wrapper">
                      <div className="user-sidebar-items">
                        <NavLink
                          to={`/users/${story?.user_id}`}
                          className="profile-link"
                        >
                          <div className="profile-picture">
                            <img
                              src={story.User?.image_url}
                              alt="Profile"
                              className="profile-image"
                            ></img>
                            <div className="under-image"></div>
                          </div>
                        </NavLink>
                        <div className="sb-spacer"></div>
                        <NavLink
                          to={`/users/${story?.user_id}`}
                          className="profile-link"
                        >
                          <h2 className="profile-author-name">
                            <span className="user">
                              {story?.User?.username}
                            </span>
                          </h2>
                        </NavLink>
                        <div className="follow-button-holder">
                          {user && isLoaded && followings && followings.length >= 0 && (user?.id !== story?.user_id) && (
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
      }
    </div >
  );
};

export default StoryDetails;
