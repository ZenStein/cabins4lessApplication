import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
//import * as courseActions from '../../actions/courseActions'

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);
        
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

ManageCoursePage.propTypes = {

};

function mapStateToProps(){

}
function mapDispatchToProps(){

}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)