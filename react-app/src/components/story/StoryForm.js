import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as storyActions from "../../store/stories";
import SideBar from "../SideBar";
import RichEditor from "../editor/RichEditor";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw } from "draft-js";
import RichEditor2 from "../editor/RichEditor2";
import './Story.css'

const StoryForm = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [body, setBody] = useState(
    JSON.stringify(convertToRaw(editorState.getCurrentContent()))
  );

  useEffect(() => {
    setBody(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);


  useEffect(() => {
    dispatch(storyActions.fetchAllStories());
  }, [dispatch]);


  const postStory = async (e) => {
    e.preventDefault();
    setErrors([]);
    const story = { title, body };
    await dispatch(storyActions.fetchPostStory(story)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(Object.values(data.errors));
      }
    });
    history.push("/stories");
  };

  return (
    <div className="user-page-container">
      <div className="user-page-holder">
        <div className="flexRow">
          <SideBar />
          <div className="centerCol flexCol pagePadding">
            <form className="flexCol centerCol" onSubmit={postStory}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <textarea
                  className="noResize width700 fontSize42 heightFitContent noBorder"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
                ></textarea>
              </div>
              <div className="width700">
                <RichEditor2 editorState={editorState} setEditorState={setEditorState} />
              </div>
              <div className="flexRow centerRow">
                <button type="submit" className="writeStory">Publish</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
