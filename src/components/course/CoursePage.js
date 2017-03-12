import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList'
import {browserHistory} from 'react-router'
/* 
                <h2>Add Course</h2>
                <input 
                    type="text"
                    onChange={this.onTitleChange}
                    value={this.state.course.title}/>
                <input type="submit"
                       value="Save"
                       onClick={this.onClickSave} />

    onTitleChange(event){
        const course = this.state.course
        course.title = event.target.value
        this.setState({ course: course })
    }
    onClickSave(){
       this.props.actions.createCourse(this.state.course)
    }

        this.onTitleChange = this.onTitleChange.bind(this)
        this.onClickSave = this.onClickSave.bind(this)

        this.state = {
            course: {
                title: ""
            }
        }        
*/
class CoursePage extends React.Component{
    constructor(props, context){
        super(props, context)
       // this.courseRow = this.courseRow.bind(this)
       this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    // courseRow(course, index){
    //     return <div key={index}>{course.title}</div>
    // }
    redirectToAddCoursePage(){
        browserHistory.push('/course')
    }
    render(){
        const {courses} = this.props
        return (
            <div>   
                <h1>Course</h1>
                <input 
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                <CourseList courses={courses} />
            </div>
        )
    }
}
CoursePage.propTypes = {
    courses: React.PropTypes.array,
    actions: React.PropTypes.object.isRequired
}
function mapStateToProps(state, ownProps){
    return {
        courses: state.courses //state.courses here references the reducers property in courseReducer.js
    }
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)