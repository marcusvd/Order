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
    public class MeasureRepository : Repository<Measure>, IMeasureRepository
    {
        private readonly OSDbContext _CONTEXT;
        public MeasureRepository(OSDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<Measure>> GeAllCategories()
        {
            return await _CONTEXT.Measures.AsNoTracking().ToListAsync();
        }
    

        public Task<Measure> GetByIdAsync(int id)
        {
            return _CONTEXT.Measures.SingleOrDefaultAsync(_id => _id.Id == id);
        }



    }
}