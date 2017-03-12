import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import smsBlast from './smsBlastReducer'
import units from './adminReducer'
import ajaxCallsinProgress from './ajaxStatusReducer'

const rootReducer = combineReducers({ 
    courses, 
    authors, 
    ajaxCallsinProgress,
    smsBlast,
    units
})

export default rootReducer