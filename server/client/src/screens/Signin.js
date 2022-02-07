import React,{useState, useContext} from "react";
import { UserContext } from '../App';
import { Link, useNavigate} from "react-router-dom";
import M from "materialize-css";

const Signin = () => {
  const {state, dispatch} = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => { 
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"Invalid email",classes:"#c62828 red darken-3"})
      return
    }
    fetch("/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => { 
        if(data.error) M.toast({html: data.error,classes:"#262828 red darken-3"})
        else{
          localStorage.setItem('jwt',data.token);
          localStorage.setItem('user',JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user});
          M.toast({html:"signed success",classes:"#43a047 green darken-1"})
          navigate("/")
        } 
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn waves-effect waves-light #64b5f6 blue lighten-2"
          onClick={()=>postData()}
        >
          Signin
        </button>
        <h5><Link to="/signup">Don't have an account?</Link></h5>
      </div>
    </div>
  );
};

export default Signin;
