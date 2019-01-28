using System.IO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using EmployeeManagementReact.Models;

namespace EmployeeManagementReact.Controllers
{
    [Route("api/[controller]/[action]")]
    public class LoginController: Controller
    {
       
        [HttpPost]
        public ActionResult<string> CheckUser()
        {
            string userJson=new StreamReader(Request.Body).ReadToEnd();
            User user = JsonConvert.DeserializeObject<User>(userJson);
            string result = null;
            if (user.UserName == "admin"&& user.Password == "admin") {
                result = "userExist";
            }
            return result;
        }
        
    }

    
}

