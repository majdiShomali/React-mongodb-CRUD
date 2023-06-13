import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

      const [status , setStatus] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const userData = {
          email: email,
          password:password
        };
    
        try {
          // Send the data to the server using an HTTP POST request
          const response = await axios.post(
            "http://localhost:5000/api/usersLogin",
            userData
          );
          console.log("Data inserted:", response.data);
          if(response.data.error != 'incorrect password'){
            setStatus("success");

          }else{
            setStatus("failed");
          }
          
        } catch (error) {
          console.error("Error inserting data:", error);
          setStatus("error");
        }
      };






  return (
    <>
    <h1>Login Form</h1>
    <form onSubmit={handleSubmit}>

          <label>
          email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
          Password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
    <p>{status}</p>
    
    
    </>
  )
}

export default Login