import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction, updateTaskAction } from "../actions/tasksActions";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import "./SingleTask.css";

function SingleTask({ match, history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tdDate, setTdDate] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const { loading, error } = taskUpdate;

  const taskDelete = useSelector((state) => state.taskDelete);
  const { loading: loadingDelete, error: errorDelete } = taskDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTaskAction(id));
    }
    navigate("/mytasks");
  };

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/tasks/${params.id}`);

      setTitle(data.title);
      setDescription(data.description);
      setTdDate(data.tdDate);
      setDate(data.updatedAt);
    };
    fetching();
  }, [params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setTdDate("");
    setDescription("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateTaskAction(params.id, title, description, tdDate));
    if (!title || !description || !tdDate) return;

    resetHandler();
    navigate("/mytasks");
  };

  return (
    <MainScreen title="Edit Task">
      <Card>
        <Card.Header>
          <b>Edit your Task</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group controlId="title">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>
                  <b>Task Preview</b>
                </Card.Header>
                <Card.Body>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="description">
              <Form.Label>
                <b>Date</b>
              </Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the Date"
                required
                value={tdDate}
                onChange={(e) => setTdDate(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <div className="btns">
              <Button variant="primary" type="submit">
                Update Task
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(params.id)}
              >
                Delete Task
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default SingleTask;
