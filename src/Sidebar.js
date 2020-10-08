import React from 'react'
import './Sidebar.css'
import HomeIcon from '@material-ui/icons/Home';
import SidebarOption from './SidebarOption';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PersonIcon from '@material-ui/icons/Person';
function Sidebar() {
    return (
        <div className = "Sidebar">
            <img alt="timer" src={require('./images/logo.jpg')} />

            <SidebarOption text="Home" Icon={HomeIcon}/>
            <SidebarOption text="Profile" Icon={PersonIcon}/>
            <SidebarOption text="About Us" Icon={ImportContactsIcon}/>
            <SidebarOption text="Contact Us" Icon={ContactSupportIcon}/>

            <button><h2>LogOut</h2></button>
            
        </div>
    )
}

export default Sidebar
