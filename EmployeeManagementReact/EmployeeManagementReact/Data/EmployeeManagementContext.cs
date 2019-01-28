using EmployeeManagementReact.Model;
using Microsoft.EntityFrameworkCore;


namespace EmployeeManagementReact.Data
{
    public class EmployeeManagementContext : DbContext
    {
        public EmployeeManagementContext(DbContextOptions<EmployeeManagementContext> options)
           : base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
    }
}
