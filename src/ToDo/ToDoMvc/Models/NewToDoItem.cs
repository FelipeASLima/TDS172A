using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoMvc.Models
{
    public class NewToDoItem
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public DateTimeOffset DueAt { get; set; }
    }
}
