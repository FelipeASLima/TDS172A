using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoMvc.Models.View
{
    public class Product
    {
		public Guid Id { get; set; }		
		public string Title { get; set; }
		public Double Price { get; set; }
		public String Address { get; set; }
	}
}
