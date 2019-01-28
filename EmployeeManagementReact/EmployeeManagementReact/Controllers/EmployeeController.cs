using EmployeeManagementReact.Data;
using EmployeeManagementReact.Model;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementReact.Controllers
{
    [Route("api/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly EmployeeManagementContext _context;

        public EmployeeController(EmployeeManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IQueryable<Employee> DisplayAllEmployees()
        {
            IQueryable<Employee> employees = _context.Employee;
            return employees;
        }

        [HttpPost]
        public ActionResult<string> CreateEmployee()
        {
            string employeeJson = new StreamReader(Request.Body).ReadToEnd();
            Employee employee = JsonConvert.DeserializeObject<Employee>(employeeJson);
            _context.Add(employee);
            _context.SaveChanges();
            return "success";
        }

        [HttpPut]
        public ActionResult<string> UpdateEmployee()
        {
            
            string employeeJson = new StreamReader(Request.Body).ReadToEnd();
            Employee employee = JsonConvert.DeserializeObject<Employee>(employeeJson);
            
            _context.Employee.Update(employee);
            _context.SaveChanges();
            return "success";
        }

        [HttpDelete]
        public ActionResult<string> DeleteEmployee()
        {
            string employeeJson = new StreamReader(Request.Body).ReadToEnd();
            Employee employee = JsonConvert.DeserializeObject<Employee>(employeeJson);

            _context.Employee.Remove(employee);
            _context.SaveChanges();
            return "success";
        }

        [HttpPost]
        public IQueryable<Employee> SearchEmployee()
        {
            string employeeJson = new StreamReader(Request.Body).ReadToEnd();
            Employee employee = JsonConvert.DeserializeObject<Employee>(employeeJson);

            IQueryable<Employee> employees = _context.Employee;

            if (!string.IsNullOrEmpty(employee.FirstName))
            {
                employees = employees.Where(e => e.FirstName.Contains(employee.FirstName.Trim()));
            }

            if (!string.IsNullOrEmpty(employee.LastName))
            {
                employees = employees.Where(e => e.LastName.Contains(employee.LastName.Trim()));
            }

            if (!string.IsNullOrEmpty(employee.Gender))
            {
                employees = employees.Where(e => e.Gender.Contains(employee.Gender));
            }

            if (!string.IsNullOrEmpty(employee.Department))
            {
                employees = employees.Where(s => s.Department.Contains(employee.Department));
            }

            if (!string.IsNullOrEmpty(employee.Address))
            {
                employees = employees.Where(e => e.Address.Contains(employee.Address.Trim()));
            }

            if (!string.IsNullOrEmpty(employee.Phone))
            {
                employees = employees.Where(e => e.Phone.Contains(employee.Phone.Trim()));
            }

            if (!string.IsNullOrEmpty(employee.Email))
            {
                employees = employees.Where(e => e.Email.Contains(employee.Email.Trim()));
            }

            return employees;
        }

    }
}
