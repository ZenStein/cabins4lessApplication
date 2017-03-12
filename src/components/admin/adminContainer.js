import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import toastr from 'toastr'
import TextInput from '../common/TextInput'
import SelectInput from '../common/SelectInput'
import NumberInput from '../common/NumberInput'
import CheckboxInput from '../common/CheckboxInput'
import * as adminActions from '../../actions/adminActions'
import {AgGridReact} from 'ag-grid-react'
import Dropzone from 'react-dropzone'

class AdminContainer extends Component {
    constructor(props, context) {
        super(props, context);
        console.log('props in admin', props)
        this.state ={
            unit:{
                unitNumber:'',
                bedrooms:0,
                bathrooms:0,
                sleeps:0,
                fireplace: false,
                spa:false,
                pets: false,
                bbq: false,
                desc:''
            },
            errors:{
                unitNumber:'',
                bedrooms: ''
            },
            columns: [
            {headerName: 'unitNumber', field: 'unitNumber'},
            {headerName: 'bedrooms', field: 'bedrooms'},
            {headerName: 'bathrooms', field: 'bathrooms'},
            {headerName: 'sleeps', field: 'sleeps', sort: 'asc'},
            {headerName: 'fireplace', field: 'fireplace'},
            {headerName: 'spa', field: 'spa'},
            {headerName: 'pets', field: 'pets'},
            {headerName: 'bbq', field: 'bbq'},
            {headerName: 'desc', field: 'desc'}
            ],
            // rows: Object.keys(this.props.units).map(key =>{
            //     console.log(this.props.units[key])
            //     return this.props.units[key]
            // }),
            rows:[],
            style:{
                height: '200px'
            }

        }
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onChange = this.onChange.bind(this);
        this.saveUnit = this.saveUnit.bind(this);
        this.onGridReady = this.onGridReady.bind(this);
    }
   // componentWillReceiveProps(props){
       //console.log('CDMCDMCDMCDM, props', props)
    //    if(!props.units.isArray){
    //     console.log('CDMCDMCDMCDM, if fired', props)
    //     this.setState({
    //         rows:
    //             Object.keys(props.units).map(key =>{
    //                 console.log(props.units[key])
    //                 return props.units[key]
    //             })
    //     })
    //    }
   // }
    onGridReady(params){
        //console.log('init init nitn')
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.props.actions.getUnits().then((units)=>{
         const newRows = Object.keys(units).map((unitKey) =>{
                return units[unitKey]
            })
             this.api.setRowData(newRows)
             this.setState({rows: newRows})
             console.log('this.state', this.state)
        })
    }
    onSelectionChanged(){
        // console.log('onSelectionChangedNodes', this.api.getSelectedNodes())
        // console.log('onSelectionChangedRows', this.api.getSelectedRows()[0])
         const formFill = this.api.getSelectedRows()[0]
        // console.log('onSelectionChangedRows', this.columnApi)
        //                 const newRow = {
        //     unitNumber: formFill.unitNumber,
        //     bedrooms: formFill.bedrooms,
        //     bathrooms: formFill.bathrooms,
        //     sleeps: formFill.sleeps,
        //     fireplace: formFill.fireplace,
        //     spa: formFill.spa,
        //     pets: formFill.pets,
        //     bbq: formFill.bbq,
        //     desc: formFill.desc
        // }
     //   console.log('formFill', formFill)
        this.setState({unit: formFill}, () => {
       //     console.log(this.state.unit)
            this.forceUpdate()
        })
    }
    onChange(e){
     //   console.log('onchangecalled')
        let newVal = e.target.value
        
        if(typeof this.state.unit[e.target.name] == 'boolean'){
            newVal = e.target.checked     
        }
        if(typeof this.state.unit[e.target.name] == 'number'){
            newVal = parseInt(e.target.value)     
        }

        this.setState({
            unit:
                Object.assign({}, this.state.unit, {[e.target.name]: newVal})
        }, ()=>{
       //     console.log(this.state)
        })
    }
    saveUnit(e){
        e.preventDefault()
       // console.log('saving')

        //console.log('action', this.props)
        //         const newRow = {
        //     unitNumber: this.state.unit.unitNumber,
        //     bedrooms: this.state.unit.bedrooms,
        //     bathrooms: this.state.unit.bathrooms,
        //     sleeps: this.state.unit.sleeps,
        //     fireplace: this.state.unit.fireplace,
        //     spa: this.state.unit.spa,
        //     pets: this.state.unit.pets,
        //     bbq: this.state.unit.bbq,
        //     desc: this.state.unit.desc
        // }
        // const newRows = [
        //         ...this.state.rows,
        //         Object.assign({}, newRow)
        //     ]
        const unit = this.state.unit
        const key = `unit${unit.unitNumber}`
        this.props.actions.saveUnit(unit, key).then(res =>{
            console.log('.then after save unit', res)
            if(res.created == true){
                let rows = this.state.rows.concat(res.unit)
                console.log('rows', rows)
                this.setState({rows})
                this.api.setRowData(rows)    
            }
            if(res.updated == true){
                let index = this.state.rows.findIndex((row, i) =>{
                    //console.log('res.unit.unitNumber',res.unit.unitNumber)
                    return res.unit.unitNumber == row.unitNumber
                })
                console.log('index', index)
                
                const updatedRows = [
                    ...this.state.rows.slice(0,index),
                    Object.assign({},res.unit),
                    ...this.state.rows.slice(index+1)
                ]
                console.log('updated new rows2', updatedRows)
                this.api.setRowData(updatedRows)
                this.setState({rows: updatedRows})

            }
            // see if unit number already exists.
            //console.log('after save first param', unit )
         //   console.log('after save second param', r )
           // this.api.setRowData(newRows)
            //console.log()
        })
        
        // this.setState({
        //     rows: newRows
        // }, () => {
        //     console.log('this.api type', typeof this.api.setRowData)
        // })
    }
    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    }
    render() {
        return (
            <div>
            <h1>
                Admin
            </h1>
            <div className="ag-dark" style={this.state.style}>
                <AgGridReact 
                columnDefs={this.state.columns}
                rowData={this.state.rows}
                rowHeight="22" 
                onSelectionChanged={this.onSelectionChanged}
                rowSelection="single"
                onGridReady={this.onGridReady}/>
            </div>
            <form onSubmit={this.saveUnit}>
                <TextInput
            name="unitNumber"
            label="Unit Number"
            value={this.state.unit.unitNumber}
            onChange={this.onChange}
            errors={this.state.errors.unitNumber} />
                <NumberInput 
                name="bedrooms" 
                label="Bedrooms"
                onChange={this.onChange} 
                placeholder="number of bedrooms" 
                value={this.state.unit.bedrooms}
                error={this.state.errors.bedrooms}
                />
                <NumberInput 
                name="bathrooms" 
                label="Bathrooms"
                onChange={this.onChange} 
                placeholder="number of bathrooms" 
                value={this.state.unit.bathrooms}
                error={this.state.errors.bathrooms}
                />
                <NumberInput 
                name="sleeps" 
                label="Sleeps"
                onChange={this.onChange} 
                placeholder="number of sleeps" 
                value={this.state.unit.sleeps}
                error={this.state.errors.sleeps}
                /> 
                <div className="form-group">
                <CheckboxInput 
                name="fireplace"
                value={this.state.unit.fireplace}
                onChange={this.onChange}
                /> 
                <CheckboxInput 
                name="spa"
                value={this.state.unit.spa}
                onChange={this.onChange}
                />
                <CheckboxInput 
                name="pets"
                value={this.state.unit.pets}
                onChange={this.onChange}
                />
                <CheckboxInput 
                name="bbq"
                value={this.state.unit.bbq}
                onChange={this.onChange}
                />
                </div>                            
                <label htmlFor="desc">Unit Description</label>
                <div className="form-group">
                <textarea 
                className="form-control" 
                rows="3" 
                onChange={this.onChange}
                value={this.state.unit.desc}
                placeholder="unit description"
                name="desc" />
                </div>
                <Dropzone onDrop={this.onDrop}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <button type="submit" className="btn btn-primary">Save Unit</button>
                
                </form>
            </div>
        );
    }
}

AdminContainer.propTypes = {

};

const mapStateToProps = (state, ownProps)=>{
  // console.log('mapstate state= ', state)
   return {
       units: state.units
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        actions: bindActionCreators(adminActions, dispatch)
    } 
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)