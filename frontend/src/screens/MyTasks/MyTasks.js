import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskAction, listTasks } from "../../actions/tasksActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Loading";
import "./MyTask.css";

const MyTasks = (history) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [style, setStyle] = useState();
  const changeStyle = () => {
    setStyle("todayTasks");
  };

  const taskList = useSelector((state) => state.taskList);
  const { loading, tasks, error } = taskList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskCreate = useSelector((state) => state.taskCreate);
  const { success: successCreate } = taskCreate;

  const taskUpdate = useSelector((state) => state.taskUpdate);
  const { success: successUpdate } = taskUpdate;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTaskAction(id));
    }
  };

  const today = new Date().toISOString().substr(0, 10);

  const list = taskList.tasks;
  if (taskList.tasks && taskList.tasks.length !== 0) {
    list.sort((a, b) => (a.tdDate > b.tdDate ? 1 : -1));
  }

  useEffect(() => {
    dispatch(listTasks());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome ${userInfo.name}...`}>
        <h3 className="subtitle">Today's tasks are highlighted for you.</h3>
        <h3 className="subtitle">To-do list organized by date.</h3>
        <Link to="/createtask">
          <button type="button" className="btn btn-outline-primary">
            Create New Task
          </button>
        </Link>

        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {tasks?.map((task) => (
          <Accordion key={task._id}>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header
                  style={{ display: "flex" }}
                  className={today === task.tdDate ? "todayTasks" : ""}
                >
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header
                      as={Card.Text}
                      variant="link"
                      eventkey="0"
                    >
                      {task.title}
                    </Accordion.Header>
                  </span>

                  <div>
                    <Button href={`/task/${task._id}`}>Update</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Body>
                  <Card.Body>
                    <Card.Title>
                      <h4>
                        <Badge variant="success">Date - {task.tdDate}</Badge>
                      </h4>
                    </Card.Title>
                    <Card.Text>{task.description}</Card.Text>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
      </MainScreen>
    </div>
  );
};

export default MyTasks;
