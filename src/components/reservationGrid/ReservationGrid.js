import React, { Component, PropTypes } from 'react';
import ReactDataGrid from 'react-data-grid'
import DatePicker from 'react-bootstrap-date-picker'
import {Form, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {AgGridReact} from 'ag-grid-react';
import {headers, rowData} from '../../api/mockReservationGrid'

class ReservationGrid extends Component {

    constructor(props, context) {
        super(props, context);
        let value = new Date().toISOString();
        this.state = {
            rows: rowData,
            columns: headers,
            value: value,
            style:{
                height:'200px'
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(){

    }
    render() {
        return (
        <div>
            <div className="text-center"><br /><br />
                <Form inline>
                    <FormGroup controlId="formInlineName">
                    {' '}
                    <Button bsStyle="primary">Left</Button>
                    </FormGroup>
                    {' '}
                    <FormGroup controlId="csDatePicker">
                    {' '}
                    <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} showClearButton={false}/>
                    </FormGroup>
                    {' '}
                    <Button bsStyle="primary">Right</Button>
                </Form>  
            </div> <br /><br />          
            <div className="ag-dark" style={this.state.style}>
                <AgGridReact 
                columnDefs={this.state.columns}
                rowData={this.state.rows}
                rowHeight="22" />
            </div>
        </div>  
        )
    }
}

ReservationGrid.propTypes = {

};

export default ReservationGrid;