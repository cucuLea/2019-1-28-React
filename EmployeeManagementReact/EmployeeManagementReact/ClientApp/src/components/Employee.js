import React, { Component } from 'react';
import { EmployeeTable } from './EmployeeTable';
import { Page } from './Page';
import { CUD } from './CUD';
export class Employee extends Component {

    componentWillMount() {
        var value = sessionStorage.getItem("user");        
        if (value === null) { alert("please login first");window.location.href = "/"; }
    }

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true,
            ChooseTableIndex: -1,
            ChooseEmployee: null,
            IsSortDesc: false,              
            sortBy: "id",
            sortByHistory: null,
            onePageDataNum:4,
        };



        fetch('api/Employee/DisplayAllEmployees')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    employees: data,
                    loading: false,
                    pageNum: Math.ceil(data.length / this.state.onePageDataNum),
                    pageIndex: 1,
                    displayEmployees: data.slice(0, this.state.onePageDataNum),
                });
            });
    }

    loginOut() {
        sessionStorage.removeItem('user');
        window.location.href = "/";
    }

    jumpToCreateForm() {
        this.props.history.push('/createEmployee');
    }

    jumpToUpdateForm() {
        if (this.state.ChooseEmployee === null) { alert("please focus one target");return; }
        this.props.history.push('/updateEmployee', { employee: this.state.ChooseEmployee });
    }

    deleteEmployee() {
        if (this.state.ChooseEmployee === null) { window.alert("please focus one target"); return; }
        let confirmDelete = window.confirm("Are you sure to delete employee?");
        if (!confirmDelete) { return; }

        const employees = this.state.employees.slice();
        const pageIndex = this.state.pageIndex;
        const chooseTableIndex = this.state.ChooseTableIndex;
        fetch('api/Employee/DeleteEmployee', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.ChooseEmployee)
        })
            .then(response => response.text())
            .then(data => {
                if ('success' == data) {
                    const newEmployees = employees.slice(0, (pageIndex - 1) * this.state.onePageDataNum + chooseTableIndex).concat(employees.slice((pageIndex - 1) * this.state.onePageDataNum + chooseTableIndex+1));
                    this.setState({
                        employees:newEmployees,
                        pageIndex:1,
                        ChooseTableIndex: -1,
                        pageNum: Math.ceil(newEmployees.length / this.state.onePageDataNum),
                        displayEmployees: newEmployees.slice(0, this.state.onePageDataNum),
                    });
                    alert('delete sucess');
                }
                else {
                    alert('there are some erro');
                }
            });
        
    }

    filterEmployee(searchEmployee) {
        fetch('api/Employee/SearchEmployee', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchEmployee)
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    employees: data,
                    ChooseTableIndex: -1,
                    ChooseEmployee: null,
                    pageIndex: 1,
                    pageNum: Math.ceil(data.length / this.state.onePageDataNum),
                    displayEmployees: data.slice(0, this.state.onePageDataNum),
                });
            });
    }

    sortRole(propertyName, IsSortDesc) {
        if ((typeof this.state.displayEmployees[0][propertyName]) != "number") {
            if (IsSortDesc) {
                return function (object1, object2) {
                    var value1 = object1[propertyName];
                    var value2 = object2[propertyName];
                    return value2.localeCompare(value1);
                }
            }
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1.localeCompare(value2);
            }
        }
        else {
            if (IsSortDesc) {
                return function (object1, object2) {
                    var value1 = object1[propertyName];
                    var value2 = object2[propertyName];
                    return value2 - value1;
                }
            }
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                return value1 - value2;
            }
        }
    }

    sortEmployee(sortBy) {
        let employees = this.state.employees;
        const sortByHistory = this.state.sortBy;
        let IsSortDesc = this.state.IsSortDesc;
        if (sortByHistory == sortBy) { IsSortDesc = !IsSortDesc; }
        else { IsSortDesc = false; }
        employees = employees.sort(this.sortRole(sortBy, IsSortDesc));
        this.setState({
            employees: employees,
            IsSortDesc: IsSortDesc, 
            sortBy: sortBy,
            sortByHistory: sortByHistory,
            ChooseTableIndex: -1,
            ChooseEmployee: null,
            pageIndex: 1,
            displayEmployees: employees.slice(0, this.state.onePageDataNum),
        });
    }

    focusTableLine(index,employee) {
        this.setState({ ChooseTableIndex: index, ChooseEmployee: employee });
    }

    prePage() {
        if (this.state.pageIndex == 1) { return; }
        const onePageDataNum = this.state.onePageDataNum;
        const pageIndex = this.state.pageIndex-2;
        const allEmployee = this.state.employees;
        this.setState({
            displayEmployees: allEmployee.slice(pageIndex * onePageDataNum, pageIndex * onePageDataNum + onePageDataNum),
            pageIndex: pageIndex + 1,

        });
    }

    nextPage() {
        if (this.state.pageIndex == this.state.pageNum) { return; }
        const onePageDataNum = this.state.onePageDataNum;
        const pageIndex = this.state.pageIndex;
        const allEmployee = this.state.employees;
        this.setState({
            displayEmployees: allEmployee.slice(pageIndex * onePageDataNum, pageIndex * onePageDataNum+onePageDataNum),
            pageIndex:pageIndex + 1,

        });
    }

    render() {
        return (
            <div>
                <h1>Employee Management</h1>
                <CUD
                    jumpToCreateForm={() => this.jumpToCreateForm()}
                    jumpToUpdateForm={() => this.jumpToUpdateForm()}
                    deleteEmployee={() => this.deleteEmployee()}
                    loginOut={() => this.loginOut()}
                />
                <EmployeeTable
                    loading={this.state.loading}
                    employees={this.state.displayEmployees}
                    ChooseTableIndex={this.state.ChooseTableIndex}
                    onClick={(index, employee) => this.focusTableLine(index, employee)}
                    filter={(searchEmployee) => this.filterEmployee(searchEmployee)}
                    sort={(sortBy) => this.sortEmployee(sortBy)}
                />
                <Page
                    pageIndex={this.state.pageIndex}
                    pageNum={this.state.pageNum}
                    prePage={() => this.prePage()}
                    nextPage={() => this.nextPage()}
            />
            </div>
        );
    }
}



/*搜索方法：前台直接对employee做搜索后
search(field) {
    const { searchList } = this.state;
    searchList[field] = document.getElementById(`tfoot${field}`).value;
    this.setState({
        searchList: searchList
    });
}


getSearchList() {
    const { employees, searchList } = this.state;
    let resultList = [];
    employees.map(e => {
        if (e.FirstName.toUpperCase().search(searchList["FirstName"].toUpperCase()) !== -1
            && e.LastName.toUpperCase().search(searchList["LastName"].toUpperCase()) !== -1
            && e.Gender.toUpperCase().search(searchList["Gender"].toUpperCase()) !== -1
            && e.Address.toUpperCase().search(searchList["Address"].toUpperCase()) !== -1
            && e.Phone.toUpperCase().search(searchList["Phone"].toUpperCase()) !== -1
            && e.Department.toUpperCase().search(searchList["Department"].toUpperCase()) !== -1
            && e.Email.toUpperCase().search(searchList["E-mail"].toUpperCase()) !== -1
        ) { resultList.push(e); }
        return null;
    });
    return resultList;
}

*/