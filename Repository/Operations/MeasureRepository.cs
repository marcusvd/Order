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
    public class UnitOfMeasureRepository : Repository<UnitOfMeasure>, IUnitOfMeasureRepository
    {
        private readonly OSDbContext _CONTEXT;
        public UnitOfMeasureRepository(OSDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<UnitOfMeasure>> GeAllCategories()
        {
            return await _CONTEXT.UnitsOfMeasures.AsNoTracking().ToListAsync();
        }
    

        public Task<UnitOfMeasure> GetByIdAsync(int id)
        {
            return _CONTEXT.UnitsOfMeasures.SingleOrDefaultAsync(_id => _id.Id == id);
        }



    }
}