import React, {PropTypes} from 'react'
import {Link, IndexLink} from 'react-router'
import LoadingDots from './loadingDots'

const Header = ({loading}) => {
    //console.log(loading)
    return (
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="about" activeClassName="active">About</Link>
            {" | "}
            <Link to="courses" activeClassName="active">Courses</Link>
            {" | "}
            <Link to="sms-blast" activeClassName="active">Sms Blast</Link>
            {" | "}
            <Link to="reservation-grid" activeClassName="active">Reservation Grid</Link>
            {" | "}
            <Link to="admin" activeClassName="active">Admin</Link>                                    
            {loading && <LoadingDots interval={100} dots={20}/>}
        </nav>
    )
} 

Header.PropTypes = {
    loading: PropTypes.bool.isRequired
}
export default Header