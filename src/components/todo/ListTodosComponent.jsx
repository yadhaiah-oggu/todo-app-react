import { useEffect, useState } from "react";
import {
  deleteTodoApi,
  retrieveAllTodosByUsernameApi,
} from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  // const today = new Date();
  // const targetDate = new Date(
  //   today.getFullYear() + 12,
  //   today.getMonth(),
  //   today.getDay()
  // );
  // const todos = [
  //   { id: 1, description: "Learn AWS", isDone: false, targetDate: targetDate },
  //   {
  //     id: 2,
  //     description: "Learn DevOps",
  //     isDone: false,
  //     targetDate: targetDate,
  //   },
  //   { id: 3, description: "Learn GCP", isDone: false, targetDate: targetDate },
  // ];

  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  const authContext = useAuth();
  const username = authContext.username;

  const navigate = useNavigate();

  useEffect(() => refreshTodos(), []);

  function refreshTodos() {
    retrieveAllTodosByUsernameApi(username)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => console.log(error))
      .finally(console.log("cleaned up"));
  }

  function deleteTodo(id) {
    console.log("Delete todo is Clicked" + id);
    deleteTodoApi(username, id)
      .then(() => {
        setMessage(`Delete of todo ${id} is successful`);
        refreshTodos();
      })
      .catch();
  }

  function updateTodo(id){
    console.log("update todo is called");
    navigate(`/todo/${id}`)
  }

  function addNewTodo(){
    navigate(`/todo/${-1}`)
  }

  return (
    <div className="container">
      <h1> Things You Want To Do! </h1>
      {message && <div className="alert alert-warning"> {message}</div>}

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.description}</td>
                {/* <td>{todo.isDone.toString()}</td> */}
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</button>
      </div>
    </div>
  );
}

export default ListTodosComponent;
