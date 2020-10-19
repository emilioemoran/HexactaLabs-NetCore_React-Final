using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Stock.Api.DTOs;
using Stock.Api.Extensions;
using Stock.AppService.Services;
using Stock.Model.Entities;

namespace Stock.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private OrderService orderService;
        private ProductService productService;
        private readonly IMapper mapper;

        public OrderController(OrderService orderService, ProductService productService, IMapper mapper)
        {
            this.orderService = orderService;
            this.productService = productService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Permite crear una nueva instancia
        /// </summary>
        /// <param name="value">Una instancia</param>
        [HttpPost]
        public ActionResult Post([FromBody] OrderDTO value)
        {
            TryValidateModel(value);

            try
            {
                var order = this.mapper.Map<Order>(value);
                decimal totalPrice = 0;
                List<Product> productList = new List<Product>();
                foreach (Product product in order.Products)
                {
                    Product productUpdated = this.productService.Get(product.Id);
                    if (productUpdated.Stock >= product.Quantity)
                    {
                        productList.Add(product);
                        totalPrice = totalPrice + (product.Quantity * product.SalePrice);
                        this.productService.DescontarStock(product.Id, product.Quantity);
                    }
                }
                if (productList.Count == 0)
                {
                    return Ok(new { Success = false, Message = "Ningún producto seleccionado tiene stock disponible" });
                }
                order.TotalPrice = totalPrice;
                order.Products = productList;
                this.orderService.Create(order);
                value = this.mapper.Map<OrderDTO>(order);
                return Ok(new { Success = true, Message = "", data = value });
            }
            catch
            {
                return Ok(new { Success = false, Message = "Los productos no están disponibles" });
            }
        }

        /// <summary>
        /// Permite recuperar todas las instancias
        /// </summary>
        /// <returns>Una colección de instancias</returns>
        [HttpGet]
        public ActionResult<IEnumerable<OrderDTO>> Get()
        {
            try
            {
                var result = this.orderService.GetAll();
                return this.mapper.Map<IEnumerable<OrderDTO>>(result).ToList();
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Permite recuperar una instancia mediante un identificador
        /// </summary>
        /// <param name="id">Identificador de la instancia a recuperar</param>
        /// <returns>Una instancia</returns>
        [HttpGet("{id}")]
        public ActionResult<OrderDTO> Get(string id)
        {
            try
            {
                var result = this.orderService.Get(id);
                return this.mapper.Map<OrderDTO>(result);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Permite borrar una instancia
        /// </summary>
        /// <param name="id">Identificador de la instancia a borrar</param>
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            try
            {
                var order = this.orderService.Get(id);
                this.orderService.Delete(order);
                return Ok(new { Success = true, Message = "", data = id });
            }
            catch
            {
                return Ok(new { Success = false, Message = "", data = id });
            }
        }

    }
}