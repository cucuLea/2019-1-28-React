import React, { Component } from 'react';

export class SearchTexts extends Component {
    constructor(props) {
        super(props);
        this.state = {
                firstName: '',
                lastName: '',
                gender: '',
                birth: '',
                department: '',
                address: '',
                phone: '',
                email: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState(
          {
            [name]: value
        });
    }

    render() {
        
        return (
            <tfoot className="searchTexts">
                <tr>
                    <th>
                        <button className="button" onClick={() => this.props.filter(this.state)}>filter</button>
                    </th>
                    <th><input type="text" name="firstName" placeholder='FirstName' value={this.state.firstName} onChange={this.handleChange} /></th>
                    <th><input type="text" name="lastName" placeholder='LastName' value={this.state.lastName} onChange={this.handleChange} /></th>
                    <th>
                        <select name="gender" name="gender" value={this.state.gender} onChange={this.handleChange}>
                            <option value=""></option>
                            <option value="F">F</option>
                            <option value="M">M</option>
                        </select>
                    </th>
                    <th>...................</th>
                    <th>
                        <select name="department" value={this.state.department} onChange={this.handleChange}>
                            <option value=""></option>
                            <option value="developer">developer</option>
                            <option value="tester">tester</option>
                            <option value="manager">manager</option>
                        </select>
                    </th>
                    <th><input type="text" name="address" placeholder='Address' value={this.state.address} onChange={this.handleChange} /></th>
                    <th><input type="text" name="phone" placeholder='Phone' value={this.state.phone} onChange={this.handleChange} /></th>
                    <th><input type="text" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} /></th>
                </tr>
            </tfoot>
            );
    }
}