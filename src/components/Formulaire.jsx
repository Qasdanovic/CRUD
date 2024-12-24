import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addUser, deleteUser, updateUser } from "../redux-toolkit/userReducer";

function Formulaire() {
  const initialState = {
    id: uuid(),
    name: "",
    username: "",
    email: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const dispatch = useDispatch();

  const getData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const getDataToUpdate = (e) => {
    const { id, value } = e.target;
    setSearchedUser({ ...searchedUser, [id]: value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.email) {
      return alert("Please fill in all fields!");
    }

    dispatch(addUser(formData));
    setFormData(initialState);
  };

  const getUser = (id) => {
    const dataWanted = users.find((user) => user.id === id)
    setSearchedUser(dataWanted)
    setFormData(dataWanted)
  };

  const handelUpdate = (e) => {
    e.preventDefault()
    const payload = {
      id : searchedUser.id,
      newData : searchedUser
    }
    dispatch(updateUser(payload))
    setSearchedUser(null)
  }

  const users = useSelector((state) => state.users.value);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Add User
        </h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">
            Name:
          </label>
          <input
            onChange={searchedUser ? getDataToUpdate : getData}
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your name"
            value={searchedUser ? searchedUser.name : formData.name}
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1">
            Username:
          </label>
          <input
            onChange={searchedUser ? getDataToUpdate : getData}
            type="text"
            id="username"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your username"
            value={searchedUser ? searchedUser.username : formData.username}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">
            Email:
          </label>
          <input
            onChange={searchedUser ? getDataToUpdate : getData}
            type="text"
            id="email"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your email"
            value={searchedUser ? searchedUser.email : formData.email}
          />
        </div>
        {searchedUser ? (
          <button
            onClick={handelUpdate}
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
            Update User
          </button>
        ) : (
          <button
            onClick={handelSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add User
          </button>
        )}
      </form>

      {users.length ? (
        <table className="mt-8 w-full max-w-4xl bg-white border-collapse border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white text-sm uppercase font-semibold">
              <th className="p-3 border border-gray-300">ID</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Username</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}>
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className="p-3 border border-gray-300">{user.name}</td>
                <td className="p-3 border border-gray-300">{user.username}</td>
                <td className="p-3 border border-gray-300">{user.email}</td>
                <td className="p-3 border border-gray-300 space-x-2">
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={() => getUser(user.id)}>
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => dispatch(deleteUser(user.id))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>no users added yet !</h1>
      )}
    </div>
  );
}

export default Formulaire;
