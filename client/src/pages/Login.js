import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../Styles/Login.scss"


const Login = () => {
    const navigate = useNavigate();
        const handleSubmit=(e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        const data = {email : email , password : password};
        fetch("http://localhost:5000/submit", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((res)=>{
                 if(res.status==200){
                    window.alert("login successful!");
                    navigate("/homepage");
                 }else{
                    window.alert("User Not Found! Plz register.");
                 }
              }).catch(err=>{
                console.log('err '+err)
              })   
    }
  return (
    <div>
        
      <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Bhav Chat</span>
        <span className="title">Log In</span>
        <form action="" onSubmit={handleSubmit}>
          <input type="email" name="email" id="" placeholder="email"  />
          <input type="password" name="password" id="" placeholder="password"/>
          <button>Sign In</button>
        </form>
        <p>
          Don't have an account?
          <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login