import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toastr from 'toastr'

class AdminContainer extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    render() {
        return (
            <h1>
                Admin
            </h1>
        );
    }
}

AdminContainer.propTypes = {

};

const mapStateToProps = (state, ownProps)=>{
   return state
}
const mapDispatchToProps = (dispatch)=>{
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)