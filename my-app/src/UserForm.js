import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
  const [updateUser, setUpdateUser] = useState(false);
  const [userId, setUserId] = useState();
  const [CurruntUser, setCurruntUser] = useState("");

  const [firstName, setFirstName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName,
      email: email,
      password:password
    };

    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData
      );
      console.log("Data inserted:", response.data[1]);
      localStorage.setItem("auth",response.data[1])

      // Clear the form fields after successful insertion
      setFirstName("");
      setEmail("");
      setPassword("");
      fetchUsers();
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      fetchUsers(); // Refresh the user list after deleting a user
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT or PATCH request to update the user
      const updatedUser = {
        // Update the properties of the user as needed

        firstName: firstName,
        password:password,

      };

      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      fetchUsers(); // Refresh the user list after updating a user
    } catch (error) {
      console.error("Error updating user:", error);
    }

    setFirstName("")
    setPassword("")
  };

  const handleUpdateUser = async (user,userId) => {
    setUpdateUser(true);
    setUserId(userId);
    setFirstName(user.firstName)

    setPassword("")
    
  };

  const handleShowUser = async (user,userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setCurruntUser(response.data[0].firstName); 
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
    
  };


  return (
    <>
    <h1>SignUp Form</h1>
      {updateUser == false ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <br />
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
      ) : (
        <form onSubmit={handleSubmitUpdate}>
          <label>
          New Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
 
          
          <br />
          <label>
         New password:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">update</button>
        </form>
      )}

      <div>
        <h1>User List</h1>
        <h2>{CurruntUser}</h2>
        {users.map((user) => (
          <div key={user._id}>
            <p>FirstName: {user.firstName}</p>
            <p>email: {user.email}</p>
            <p>password: {user.password}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button onClick={() => handleUpdateUser(user,user._id)}>Update</button>
            <button onClick={() => handleShowUser(user,user._id)}>ShowData</button>

            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserForm;
