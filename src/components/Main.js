import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';


const Main = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://student-register-backend-jtqr.onrender.com')
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  }, []);

  function handleDelete(id) {
    const conf = window.confirm('Do you want to delete?');
    if (conf) {
      axios.delete(`https://student-register-backend-jtqr.onrender.com/${id}`)
        .then(res => {
          alert('Record has been deleted');
          setRecords(res?.data?.data)
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div className='container mt-5'>
      <h1 className='text-center'>STUDENT MANAGEMENT SYSTEM</h1>
      <div className='text-end'>
        <Link to='/create' className='btn btn-primary'>Add+</Link>
      </div>
      <div className='table-responsive'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((d, i) => (
              <tr key={i}>
                <td>{d.Name}</td>
                <td>{d.Age}</td>
                <td>{d.City}</td>
                <td>
                  <Link to={`/update/${d._id}`} className='me-3 text-success' title="Edit">
                    <FaEdit size={20} style={{ cursor: 'pointer' }} />
                  </Link>
                  <span
                    onClick={() => handleDelete(d._id)}
                    className='text-danger'
                    title="Delete"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaTrash size={20} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
