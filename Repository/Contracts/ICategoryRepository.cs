using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data;

namespace Repository.Contracts
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Task<List<Category>> GeAllCategoriesAsync(bool include = false);
        Task<Category> GetCategoryByIdAsync(int id, bool include = false);
    }

}