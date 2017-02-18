import React from 'react'
import {Link} from 'react-router'

class HomePage extends React.Component{
    render(){
        return (
            <div className="jumbotron">
                <h1>PluralSight Admin</h1>
                <p>React redux in es6 ultra fast</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>            
        )
    }
}

export default HomePage