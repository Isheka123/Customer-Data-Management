import React,{useEffect,useState} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'
import "./Header.css"

 const Header = () => {
    const [activeTab,setActiveTab] = useState("Home");
    const location = useLocation();
    const [search, setSearch] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
      if(location.pathname === "/"){
        setActiveTab("Home")
      }else if(location.pathname === "/add"){
        setActiveTab("AddCustomer")
      }else if(location.pathname === "/about"){
        setActiveTab("About")
      }
    },[location]);
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/search?name=${encodeURIComponent(search)}`); // Remove spaces and encode the search value
      setSearch("");
    };
    
  return (
    <div className='header'>
    <p className='logo'>Customer Data Management App</p>
    <div className='header-right'>
  
        <Link to='/'>
            <p className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => setActiveTab("Home")}
            >Home</p>
        </Link>
        <Link to='/add'>
        <p className={`${activeTab === "AddCustomer" ? "active" : ""}`}
            onClick={() => setActiveTab("AddCustomer")}
            >Add Customer</p>
        </Link>
        <Link to='/about'>
        <p className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => setActiveTab("About")}
            >About</p>
        </Link>
        
    <form onSubmit={handleSubmit} >
        <input type='text' 
        className='inputField'
        placeholder='Search Name ...'
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        />
      </form>
    </div>
      
    </div>
  )
}

export default Header;