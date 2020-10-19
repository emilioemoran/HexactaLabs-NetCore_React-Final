using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Stock.Api.DTOs
{
    public class OrderDTO
    {
        public string Id { get; set; }

        public decimal TotalPrice { get; set; }

        [Required]
        public List<ProductDTO> Products { get; set; }
    }
}