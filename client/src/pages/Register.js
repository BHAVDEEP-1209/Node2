import React from 'react'
import "../Styles/Login.scss"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        
        const data = {name : name ,email : email , password : password};
        fetch("http://localhost:5000/signup", {
                method: "POST", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }).then((res)=>{
                 if(res.status==200){
                  window.alert("user added sucessfully!");
                  navigate("/");
                 }else if(res.status==204){
                  window.alert("user already exists!");
                  navigate("/");
                 }
              }).catch(err=>{
                window.alert("problem signing up!")
                console.log('err '+err)
              })   
    }
  return (
    <div>
        {/* <form onSubmit={handleSubmit}>
            <input type="text" name="name"/>
            <input type="text" name="email"/>
            <input type="text" name="password"/>
            <button >submit</button>
        </form> */}

        <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Bhav Chat</span>
        <span className="title">Register</span>
        <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name"/>
          <input type="email" name="email" id="" placeholder="email"  />
          <input type="password" name="password" id="" placeholder="password"/>
          <button>Sign In</button>
        </form>
        <p>
          Don't have an account?
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
    </div>
   
  )
}

export default Register