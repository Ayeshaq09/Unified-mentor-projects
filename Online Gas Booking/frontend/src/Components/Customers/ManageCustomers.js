import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import "../Component Styles/ManageCustomers.css";
import Modal from "./CustomerUpdateModal";
import { toast } from "react-toastify";
import Search from "../Search";

const ManageCustomers = () => {
  const usersContext = useContext(UserContext);
  const [user, setUser] = useState(null);
  const { users, fetchUsers, deleteUser } = usersContext;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchName, setSearchName] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredUser = [...users].filter((user) => {
      const userName = searchName
        ? user.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      return userName;
    });
    setFilteredUsers(filteredUser);
  }, [users, searchName]);

  const handleEdit = (user) => {
    setIsModalOpen(true);
    setUser(user);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      toast("User Deleted!");
    }
  };

  return (
    <>
      <Search
        searchName={searchName}
        setSearchName={setSearchName}
        searchCustomers={true}
      />
      <div className="users-container">
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} user={user} />}
        {filteredUsers.length > 0 &&
          filteredUsers.map((item) => (
            <div className="user-card" key={item.key}>
              <div className="user-image">
                <i className="bi bi-person-bounding-box"></i>
              </div>
              <div className="user-details">
                <p className="user-name">{item.name}</p>
                <p className="user-email">{item.email}</p>
              </div>
              <div className="user-edit">
                <i
                  className="bi bi-pencil-square user-edit-icon"
                  onClick={() => handleEdit(item)}
                ></i>
                <i
                  className="bi bi-trash user-delete-icon"
                  onClick={() => handleDelete(item.key)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ManageCustomers;
