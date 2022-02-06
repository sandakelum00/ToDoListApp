import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createTaskAction } from "../../actions/tasksActions";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import ReactMarkdown from "react-markdown";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import "./CreateTask.css";

function CreateTask({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tdDate, setTdDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const taskCreate = useSelector((state) => state.taskCreate);
  const { loading, error, task } = taskCreate;

  console.log(task);

  const resetHandler = () => {
    setTitle("");
    setDescription("");
    setTdDate("");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !description || !tdDate) return;
    dispatch(createTaskAction(title, description, tdDate));

    resetHandler();
    navigate("/mytasks");
  };

  return (
    <MainScreen title="Create a Task">
      <Card>
        <Card.Header>
          <b>Create a new Task</b>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>
                <b>Title</b>
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>
                <b>Description</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                required
                placeholder="Enter the description"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>Task Preview</Card.Header>
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
                required
                value={tdDate}
                placeholder="Enter the Date"
                onChange={(e) => setTdDate(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <div className="btns">
              <Button type="submit" variant="primary">
                Create Task
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
            </div>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateTask;
