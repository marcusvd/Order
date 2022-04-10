using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data;

namespace Repository.Contracts
{
    public interface ISubCategoryRepository : IRepository<SubCategory>
    {
        Task<List<SubCategory>> GeAllSubCategories();
        Task<SubCategory> GetById(int id);
    }

}