import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import ajaxCallsinProgress from './ajaxStatusReducer'

const rootReducer = combineReducers({ 
    courses, 
    authors, 
    ajaxCallsinProgress 
})

export default rootReducer