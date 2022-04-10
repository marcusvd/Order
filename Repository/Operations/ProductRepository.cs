using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Pagination.Models;

namespace Repository.Operations
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly OSDbContext _CONTEXT;
        public ProductRepository(OSDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<PagedList<Product>> GetAllProductAsync(Params parameters)
        {
            IQueryable<Product> query =
            GetAll().OrderBy(o => o.Name).Where(p => p.Name.ToLower().Contains(parameters.Term));
            return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<Product> GetByIdIncludeAsync(int id, bool include = false)
        {
            Product product = await GetAById(_id => _id.Id == id);
            // _CONTEXT.Products.AsNoTracking().SingleOrDefaultAsync(_id => _id.Id == id);
            if (include)
            {
                Product productIncluded = await _CONTEXT.Products.AsNoTracking()
                .Include(_sub => _sub.SubCategory)
                .Include(_cat => _cat.Category)
                .Include(_unit => _unit.UnitOfMeasure).SingleOrDefaultAsync(_id => _id.Id == id);
                return productIncluded;
            }
            return product;
        }






    }
}