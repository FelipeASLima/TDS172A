using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ToDoMvc.Controllers
{
    public class ToDoController : Controller
    {
        public IActionResult Index()
        {

            var vm = new Models.View.ToDoViewModel()
            {
                Items = new List<Models.ToDoItem>()

            };

            return View(vm);
            
        }
    }
}