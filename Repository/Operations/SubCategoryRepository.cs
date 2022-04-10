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
    public class SubCategoryRepository : Repository<SubCategory>, ISubCategoryRepository
    {
        private readonly OSDbContext _CONTEXT;
        public SubCategoryRepository(OSDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<SubCategory>> GeAllSubCategories()
        {

            List<SubCategory> Query = await _CONTEXT.SubCategories
            .AsNoTracking()
            .OrderBy(name => name.Name).ToListAsync();
            return Query;
        }

        public async Task<SubCategory> GetById(int id)
        {
            SubCategory Query = await _CONTEXT.SubCategories
            .AsNoTracking().SingleOrDefaultAsync(_id => _id.Id == id);
            return Query;
        }
    }
}