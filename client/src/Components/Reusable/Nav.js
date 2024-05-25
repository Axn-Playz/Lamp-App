import React, { useState } from 'react'

const Nav = () => {
    const [status, setStatus] = useState('Home');
    const [theme,setTheme] = useState("");
    const handleLiVal = (e) => {
        const val = e.currentTarget.dataset.value;
        setStatus(val);
    }

    const handleDarkTheme = (e) =>{
        setTheme(theme === "light"?"dark":"light")
    }
    console.log(theme)
    return (
        <div>
            <ul className={`nav nav-pills mb-3 ${theme === "light"?"dark-bg-nav text-light":""}`}>

                <div className="logo">
                    LOGO
                </div>
                <li className="nav-item">
                    <a className={`nav-link ${status === "Home" ? "active" : ''}  ${theme === "light"?"white-txt":""}`} aria-current="page" href="#" data-value={"Home"} onClick={handleLiVal}>Home</a>
                </li>

                <li className="nav-item">
                    <a className={`nav-link ${status === "Courses" ? "active" : ''}  ${theme === "light"?"white-txt":""}`} href="#" data-value={"Courses"} onClick={handleLiVal}>Courses</a>
                </li>
                <li className="nav-item" title="Unlocks At Level 5">
                    <a className={`nav-link disabled${status === "Notes" ? "active" : ''}  ${theme === "light"?"white-txt":""}`} aria-disabled="true" data-value={"Notes"} onClick={handleLiVal}>Notes</a>

                </li>
                <li className="nav-item dropdown">
                    <a className={`nav-link ${status === "more" ? "active" : ''} dropdown-toggle ${theme === "light"?"white-txt":""}`} data-bs-toggle="dropdown" href="#" role="button"
                        aria-expanded="false" data-value={"more"} onClick={handleLiVal}>More Info</a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Extra</a></li>
                        <li><a className="dropdown-item" href="#">What's new?</a></li>
                        <li><a className="dropdown-item" href="#">Feedback</a></li>
                        <li>
                            <hr className="dropdown-divider"></hr>
                        </li>
                        <li><a className="dropdown-item" href="#">Affilations</a></li>
                    </ul>
                </li>



                <div className="form-check form-switch" onClick={handleDarkTheme}>
                {" "}{theme === "light"?<i className='fa-regular fa-sun'></i>:<i className='fa-regular fa-moon'></i>}
                    <label className={`form-check-label ` }htmlFor="flexSwitchCheckDefault" > </label>
                </div>
            </ul>
        </div>
    )
}

export default Nav
