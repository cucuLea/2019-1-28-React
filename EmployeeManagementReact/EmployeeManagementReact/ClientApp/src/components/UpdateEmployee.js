import React from 'react';
import { Link } from 'react-router-dom';
import { verifyForm, required, phoneCheck, emailCheck } from './util/Validation';

export class UpdateEmployee extends React.Component {
    componentWillMount() {
        var value = sessionStorage.getItem("user");
        if (value === null) { alert("please login first"); window.location.href = "/"; }
    }

    constructor(props) {
        super(props);
        const { state } = this.props.location;
        const employee = state.employee;
        this.state = {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            gender: employee.gender,
            birth: employee.birth === null ? '' : employee.birth.slice(0, 10),
            department: employee.department,
            address: employee.address,
            phone: employee.phone,
            email: employee.email,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    updateEmployee() {
        const IsDataRight = verifyForm(this.state.firstName, this.state.lastName, this.state.phone, this.state.email);
        if (!IsDataRight) {
            window.alert("please input right information");
            return;
        }

        let employee = this.state;
        fetch('api/Employee/UpdateEmployee', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })
            .then(response => response.text())
            .then(data => {
                if ('success' == data) {
                    this.props.history.push('/');
                    alert('update sucess');
                }
                else {
                    alert('there are some erro');
                }
            });
    }

    renderCreateForm() {
        return (
            <div id="updateDiv" className="dealDiv">
                <h1>Update</h1>
                <table className="inputTable">
                    <tr>
                        <td>First Name:</td>
                        <td><input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} disabled /></td>
                    </tr>
                    <tr>
                        <td>Last Name:</td>
                        <td><input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} disabled/></td>
                    </tr>
                    <tr>
                        <td>Gender:</td>
                        <td>
                            <select name="gender" value={this.state.gender} onChange={this.handleChange} disabled>
                                <option value="F">F</option>
                                <option value="M">M</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Birth:</td>
                        <td><input type="date" name="birth" value={this.state.birth} onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Department:</td>
                        <td>
                            <select name="department" value={this.state.department} onChange={this.handleChange}>
                                <option value=""></option>
                                <option value="developer">developer</option>
                                <option value="tester">tester</option>
                                <option value="manager">manager</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Address:</td>
                        <td><input type="text" name="address" value={this.state.address} placeholder="New Address" onChange={this.handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td><input type="text" name="phone" value={this.state.phone} placeholder="New Phone" onChange={this.handleChange} /></td>
                        <td className={`validation${phoneCheck(this.state.phone) === false ? 'Display' : ''}`}>the number length should be 3~10 or 0</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input type="text" name="email" value={this.state.email} placeholder="New Email" onChange={this.handleChange} />
                            <td className={`validation${emailCheck(this.state.email) === false ? 'Display' : ''}`}> it should be email</td>
                        </td>
                    </tr>
                </table>
                <button className="saveButton" onClick={() => this.updateEmployee()}>SAVE</button>
                <Link to={'/'}> back to list</Link>
            </div>
        );
    }

    render() {
        return this.renderCreateForm();
    }
}