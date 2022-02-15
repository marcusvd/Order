using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data;

namespace Repository.Contracts
{
    public interface IUnitOfMeasureRepository : IRepository<UnitOfMeasure>
    {
        Task<List<UnitOfMeasure>> GeAllCategories();
    }

}