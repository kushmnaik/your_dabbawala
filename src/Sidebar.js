import React from 'react'
import './Sidebar.css'
import HomeIcon from '@material-ui/icons/Home';
import SidebarOption from './SidebarOption';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
function Sidebar(props) {
    return (
        <div className = "Sidebar">
            <img alt="timer" src={require('./images/logo.jpg')} />
            {props.logged_in ? 
                <div className = "Sidebar">
                    <SidebarOption text="Home" Icon={HomeIcon}/>
                    <SidebarOption text="Profile" Icon={PersonIcon}/>
                    <SidebarOption text="About Us" Icon={ImportContactsIcon}/>
                    <SidebarOption text="Contact Us" Icon={ContactSupportIcon}/>
                    <button onClick={props.handle_logout}><h2>LogOut</h2></button>
                </div>
            : 
                <div className = "Sidebar">
                    <Link to="/LogIn"><button>LogIn</button></Link>
                    <Link to="/SignUp"><button>SignIn</button></Link>
                </div>
            }
            
        </div>
    )
}

export default Sidebar
