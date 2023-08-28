import { useParams, useNavigate } from "react-router-dom";
import { retriveTodoApi, updateTodoApi,createTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import moment from "moment/moment";

function TodoComponent() {
  const { id } = useParams();
  const authContext = useAuth();
  const username = authContext.username;

  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => retrieveTodo(), [id]);

  function retrieveTodo() {
    if (id != -1) {
      retriveTodoApi(username, id)
        .then((response) => {
          setDescription(response.data.description);
          setTargetDate(response.data.targetDate);
        })
        .catch((error) => console.log(error));
    }
  }

  function onSubmit(values) {
    console.log(values);
    const todo = {
      id: id,
      username: username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };
    console.log(todo);

    if(id == -1){
        createTodoApi(username,todo)
        .then((response) => {
            console.log(response);
            navigate("/todos");
          })
          .catch((error) => console.log(error));
    } else{
        updateTodoApi(username, id, todo)
      .then((response) => {
        console.log(response);
        navigate("/todos");
      })
      .catch((error) => console.log(error));
    }
  }

  function validate(values) {
    let errors = {
      // description:'Enter a valid description'
    };
    if (values.description.length < 5) {
      errors.description = "Enter atleast 5 characters";
    }
    if (values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid()) {
      errors.targetDate = "Enter targetDate";
    }
    // console.log(values);
    return errors;
  }

  return (
    <div className="container">
      <h1>Enter Todo details</h1>
      <div>
        <Formik
          initialValues={{ description, targetDate }}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validate={validate}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />

              <fieldset className="form-group">
                <label>Description</label>
                <Field
                  type="text"
                  className="form-control"
                  name="description"
                />
              </fieldset>

              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />

              <fieldset className="form-group">
                <label>Target Date</label>
                <Field type="date" className="form-control" name="targetDate" />
              </fieldset>
              <div>
                <button className="btn btn-success m-5" type="submit">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TodoComponent;
