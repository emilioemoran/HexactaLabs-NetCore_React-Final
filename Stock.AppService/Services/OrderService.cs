using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.Extensions.Options;
using Stock.AppService.Base;
using Stock.Model.Entities;
using Stock.Repository.LiteDb.Interface;

namespace Stock.AppService.Services
{
    public class OrderService : BaseService<Order>
    {
        public OrderService(IRepository<Order> repository) : base(repository)
        {

        }

        public new Order Create(Order entity)
        {
            return base.Create(entity);
        }
    }
}