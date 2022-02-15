using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Repository.Operations
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        private readonly OSDbContext _CONTEXT;
        public CategoryRepository(OSDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }


        public async Task<List<Category>> GeAllCategories(bool include = false)
        {
            if (include)
            {
                List<Category> Query = await _CONTEXT.Categories
                .AsNoTracking()
                .Include(sub => sub.SubCategories)
                .OrderBy(name => name.Name).ToListAsync();
                return Query;
            }
            return await _CONTEXT.Categories.AsNoTracking().ToListAsync();
        }

      
    }
}