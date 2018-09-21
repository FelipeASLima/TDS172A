using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoMvc.Models;
using ToDoMvc.Models.View;
using ToDoMvc.Services;

namespace ToDoMvc.Controllers
{
    public class ToDoController : Controller
    {

        public readonly IToDoItemService _toDoItemService;

        public ToDoController (IToDoItemService service)
        {
            _toDoItemService = service;
        }
        public async  Task<IActionResult> Index()
        {
            //busca item de algum lugar
            //se necessario cura uma view model
            //encaminha para view
            var vm = new ToDoViewModel()
            {
                Items = await _toDoItemService.GetIncompleteItemsAsync()
            };

            return View(vm);
            
        }
        public async Task<IActionResult> AddItem(NewToDoItem newItem)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var succesfull = await _toDoItemService.AddItemAsync(newItem);

            if (!succesfull)
                return BadRequest(new { error = "Could not add item" });
            return Ok();
        }

    }
}