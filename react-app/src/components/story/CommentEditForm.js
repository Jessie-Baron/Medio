import { useState, useEffect } from "react";
import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { editComment } from "../../store/comment";

function CommentEditForm() {
  const comment = useSelector((state) => state.session.singleComment)


  const [body, setBody] = useState("");
  const userId = useSelector((state) => state.session.user.id);
  const storyId = Number(useLocation().pathname.split("/")[2]);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    if (!body) {
      setValidationErrors([]);
      return;
    }
    console.log("uE running");
    const errors = [];
    if (!body.length) errors.push("Please enter your comment");
  }, [body]);

  const onSubmit = async (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert(`Cannot Submit`);

    // Create a new object for the song form information.
    const commentForm = {
      body,
      userId,
      storyId
    };


    await dispatch(editComment(id, commentForm))
    .then(history.push(`/stories/${storyId}`))

    // Reset the form state.
    setBody("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  return (
    <form id="form1" noValidate onSubmit={onSubmit}>
    <ul>
      {validationErrors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
    <label>
      <textarea
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
    </label>
    <button type="submit">Respond</button>
  </form>
);
}

export default CommentEditForm;
