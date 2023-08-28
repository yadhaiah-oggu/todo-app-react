import { Link,useParams } from "react-router-dom";
// import axios from "axios";
import { useState } from "react";
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import {useAuth} from './security/AuthContext';

function WelcomeComponent() {

  const {username} = useParams();

  const [message, setMessage] = useState(null);

  const authContext = useAuth();

  function callHelloWorldRestApi(){
    console.log("Called");
    // axios.get('http://localhost:8080/hello-world')
    //   .then( (response) => successResponse(response))
    //   .catch( (error) => errorResponse(error))
    //   .finally( () => console.log("cleanup"));
    
    // retrieveHelloWorldBean()
    //   .then( (response) => successResponse(response))
    //   .catch( (error) => errorResponse(error))
    //   .finally( () => console.log("cleanup"));

      retrieveHelloWorldPathVariable('yadhi',authContext.token)
      .then( (response) => successResponse(response))
      .catch( (error) => errorResponse(error))
      .finally( () => console.log("cleanup"));
  }

  function successResponse(response){
    console.log(response);
    // setMessage(response.data)
    setMessage(response.data.message)
  }
  function errorResponse(error){
    console.log(error);
  }

  return (
    <div className="Welcome">
      <h1>Welcome {username} </h1>
      <div>
        Manage your todos - <Link to="/todos" >Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi} >
          Call hello world</button> 
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
