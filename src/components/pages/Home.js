import React, { useState, useEffect } from 'react';
import fireDb from '../../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child('customers').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val()); 
      } else {
        setData({}); 
      }
    });

    // Return the cleanup function
    return () => {
      fireDb.child('customers').off(); 
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm('Are you sure that you want to delete that customer?')) {
      fireDb.child(`customers/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success('Customer Deleted Successfully');
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child('customers')
      .orderByChild(e.target.value)
      .on('value', (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
    fireDb.child('customers').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val()); // Update state with the received data
      } else {
        setData({}); // Alternatively, you can set an empty object or handle this case as needed
      }
    });

    // Return the cleanup function
    return () => {
      fireDb.child('customers').off(); // Unsubscribe from the event when the component is unmounted
    };
  
  };

  const filterData = (value) => {
    fireDb.child("customers").orderByChild("status").equalTo(value).on("value",(snapshot) => {
      if(snapshot.val()){
        const data = snapshot.val();
        setData(data);
            }
    })
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Phone No</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            {!sort && <th style={{ textAlign: 'center' }}>Action</th>}
          </tr>
        </thead>
        {!sort ? (
          <tbody>
            {Object.keys(data).map((id, index) => (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].phone}</td>
                <td>{data[id].status}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>Update</button>
                  </Link>
                  <button
                    className='btn btn-delete'
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{item.name}</td>       
                  <td>{item.email}</td>
                  <td>{item.phone}</td>                 
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className='dropdown' name='colValue' onChange={handleChange}>
        <option>Please Select</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='phone'>Phone No</option>
        <option value='status'>Status</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>
        Reset
      </button>
      <br />
      <button className='btn btn-active' onClick={() => filterData("Active")}>Active</button>
      <button className='btn btn-inactive' onClick={() => filterData("Inactive")}>Inactive</button>
    </div>
  );
};

export default Home;
