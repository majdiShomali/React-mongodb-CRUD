import React, { useState, useEffect } from "react";
import axios from "axios";

const UserForm = () => {
  const [updateUser, setUpdateUser] = useState(false);
  const [userId, setUserId] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      age: age,
      email: email,
    };

    try {
      // Send the data to the server using an HTTP POST request
      const response = await axios.post(
        "http://localhost:5000/api/users",
        userData
      );
      console.log("Data inserted:", response.data);

      // Clear the form fields after successful insertion
      setName("");
      setAge();
      setEmail("");
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
        // For example, to update the user's name and age:
        name: name,
        age: age,
      };

      await axios.put(`http://localhost:5000/api/users/${userId}`, updatedUser);
      fetchUsers(); // Refresh the user list after updating a user
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleUpdateUser = async (user,userId) => {
    setUpdateUser(true);
    setUserId(userId);
    setName(user.name)
    setAge(user.age)
    
  };

  return (
    <>
      {updateUser == false ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleSubmitUpdate}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </label>
          <br />

          <button type="submit">update</button>
        </form>
      )}

      <div>
        <h1>User List</h1>
        {users.map((user) => (
          <div key={user._id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Email: {user.email}</p>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            <button onClick={() => handleUpdateUser(user,user._id)}>Update</button>

            <hr />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserForm;
