import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as courseActions from '../../actions/courseActions'
import CourseForm from './courseForm'
import toastr from 'toastr'
//import base from '../../base'

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context)
        
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        } 
       this.onSave = this.onSave.bind(this)
       this.onChange = this.onChange.bind(this)
       this.updateCourseState = this.updateCourseState.bind(this)
       this.saveCourse = this.saveCourse.bind(this);
       this.redirect = this.redirect.bind(this);
    }
    // componentWillMount(){
    //     console.log('cwm in course page')
    //     //this runs right before <Inventory> is rendered
    //     this.ref = base.syncState('courses', {
    //     context: this,
    //     state: 'course'
    //     })  
    // }    
    // componentWillUnmount(){
    //     base.removeBinding(this.ref)  
    // }    
    componentWillReceiveProps(nextProps){
        if(this.props.course.id != nextProps.course.id){
            //necessary to populate form when existing course is loaded directly
            this.setState({course: Object.assign({}, nextProps.course)})
        }
    }
    updateCourseState(event){
        const field = event.target.name
        let course = this.state.course        
        course[field] = event.target.value
        return this.setState({course: course})
    }
    redirect(){
        this.setState({saving: false})
        toastr.success('Course Saved')
        this.context.router.push('/courses')
    }
    saveCourse(event){
        event.preventDefault()
        this.setState({saving: true})
        this.props.actions.saveCourse(this.state.course)
        .then(()=>{ this.redirect() })
        .catch(error=>{
            toastr.error(error)
            this.setState({saving: false})
        })
    }
    onSave(){

    }
    onChange(){

    }
    render() {
        return (
                <CourseForm
                    loading={this.state.loading} 
                    onSave={this.saveCourse}
                    onChange={this.updateCourseState}                
                    allAuthors={this.props.authors}
                    course={this.state.course} 
                    errors={this.state.errors} 
                    saving={this.state.saving} />
        )
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
ManageCoursePage.contextTypes = {
    router: PropTypes.object
}
function getCourseById(courses, id){
    const course = courses.filter(course => course.id == id)
    if (course.length) return course[0] // since filter returns an array 
    return null
}
function mapStateToProps(state, ownProps){
    const courseId = ownProps.params.id // from path 'course/:id'
    let course = {id: '',watchHref:'',title:'',authorId:'',length:'',category:''}
    if(courseId && state.courses.length > 0){
        course = getCourseById(state.courses, courseId)
    }
    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        }
    })
    return {
        course: course,
        authors: authorsFormattedForDropdown
    }
}
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(courseActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)