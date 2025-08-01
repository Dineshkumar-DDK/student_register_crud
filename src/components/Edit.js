import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { _id } = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://student-register-backend-jtqr.onrender.com/${_id}`)
       .then((res) => setData({
        "Name": res?.data?.Name,
        "Age": Number(res?.data?.Age),
        "City": res?.data?.City
    }))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`https://student-management-system-server-ba7w.onrender.com/${_id}`, data)
      .then((res) => {
        alert("Data updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-light p-5">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                disabled
                name="id"
                className="form-control"
                value={_id}
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={data.Name}
                onChange={(e) => setData({ ...data, Name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                name="age"
                className="form-control"
                value={data.Age}
                onChange={(e) => setData({ ...data, Age: Number(e.target.value) })}
              />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={data.City}
                onChange={(e) => setData({ ...data, City: e.target.value })}
              />
            </div>
            <br />
            <button className="btn btn-info">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
