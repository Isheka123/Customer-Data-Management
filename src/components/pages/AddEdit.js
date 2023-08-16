import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import './AddEdit.css';
import {toast} from "react-toastify"
import fireDb from "../../firebase"

const initialState = {
  name:"",
  email:"",
  phone:"",
  status:""
}

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data ,setData] = useState({});

  const {name,email,phone,status} = state;
  const navigate = useNavigate();
  
  const {id} = useParams();
  
  useEffect(() => {
    fireDb.child("customers").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData(snapshot.val()); // Update state with the received data
      } else {
        setData({}); // Alternatively, you can set an empty object or handle this case as needed
      }
    });
  
    // Return the cleanup function
    return () => {
      fireDb.child("customers").off(); // Unsubscribe from the event when the component is unmounted
    };
  }, [id]);

  useEffect(() => {
    if(id){
      setState({...data[id]})
    }else{
      setState({...initialState})
    }

    return () =>{
      setState({...initialState})
    }
  },[id,data])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !status) {
      toast.error("Please provide value in each input field");
    } else {
      if (id) {
        // If 'id' exists, we are updating an existing product
        fireDb.child(`customers/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Customer Updated Successfully");
          }
        });
      } else {
        // If 'id' doesn't exist, we are adding a new product
        fireDb.child("customers").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Customer Added Successfully");
          }
        });
      }
      setTimeout(() => navigate("/"), 500);
    }
  };
  

  return (
    <div style={{marginTop:"100px"}}>
    <form style={{
      margin:"auto",
      padding:"15px",
      maxWidth:"400px",
      alignContent:"center",
      }}
      onSubmit={handleSubmit}
      >

      <label htmlFor='name'>Name</label>
      <input type='text' 
      id='name' 
      name='name' 
      placeholder='Name of the Customer'
      value={name || ''}
      onChange={handleInputChange} />

     <label htmlFor='email'>Email</label>
     <input type='email' 
      id='email' 
      name='email' 
      placeholder='Enter email '
      value={email || ''}
      onChange={handleInputChange} />

      

      <label htmlFor='phone'>Phone</label>
      <input type='price' 
      id='phone' 
      name='phone' 
      placeholder='Enter Phone number'
      value={phone || ''}
      onChange={handleInputChange} />


<label htmlFor='name'>Status</label>
      <input type='text' 
      id='status' 
      name='status' 
      placeholder='Product Status'
      value={status || ''}
      onChange={handleInputChange} />

    <input type='submit' value={id ? "Update" : "Save"} />
    </form>
    </div>
  )
}

export default AddEdit;