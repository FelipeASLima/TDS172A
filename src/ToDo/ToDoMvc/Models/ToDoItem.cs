using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoMVC.Models
{
	public class ToDoItem
	{
		public Guid Id { get; set; }
		public bool IsDone { get; set; }
		public string Title { get; set; }
		public DateTimeOffset? DueAt { get; set; }
		public Double Price { get; set; }
		public String Address { get; set; }





    }
}
