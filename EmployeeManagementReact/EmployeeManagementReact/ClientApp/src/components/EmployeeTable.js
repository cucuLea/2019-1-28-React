import React, { Component } from 'react';
import { SearchTexts } from './SearchTexts';
import '../css/employee.css';
export class EmployeeTable extends Component {

    judgeChooseLine(index) {
        let nameClass = this.props.ChooseTableIndex === index ? 'chooseTableLine' : '';
        return nameClass;
    }

    renderEmployeesTable(employees) {
        return (
            <table className='table' id='displayAllTable'>
                <thead>
                    <tr>
                        <th onClick={() => this.props.sort('id')}>ID</th>
                        <th onClick={() => this.props.sort('firstName')}>FirstName</th>
                        <th onClick={() => this.props.sort('lastName')}>LastName</th>
                        <th onClick={() => this.props.sort('gender')}>Gender</th>
                        <th onClick={() => { }}>Birth</th>
                        <th onClick={() => this.props.sort('department')}>Department</th>
                        <th onClick={() => this.props.sort('address')}>Address</th>
                        <th onClick={() => this.props.sort('phone')}>Phone</th>
                        <th onClick={() => this.props.sort('email')}>Email</th>                        
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee,index) =>
                        <tr key={employee.id} className={this.judgeChooseLine(index)} onClick={() => this.props.onClick(index,employee)}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.birth===null?'':employee.birth.slice(0,10)}</td>
                            <td>{employee.department}</td>
                            <td>{employee.address}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>                          
                        </tr>
                    )}
                </tbody>
                <SearchTexts
                    filter={(searchEmployee) => this.props.filter(searchEmployee)}
                />
            </table>
        );
    }

    render() {
        let contents = this.props.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeesTable(this.props.employees);
        return contents;
    }
}