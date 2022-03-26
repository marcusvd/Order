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
        // public async Task<ICollection<Product>> GetAll(Params PgParams)
        // {
        //     return await GetAll().AsNoTracking().Skip((PgParams.PgNumber - 1) * PgParams.PgSize)
        //     .Take(PgParams.PgSize)
        //     .ToListAsync();
        // }
        // public async Task<PagedList<Product>> GetAllProductAsync(Params Params)
        // {
        //     return await PagedList<Product>.ToPagedList(
        //         GetAll().OrderBy(_by => _by.Name), Params.PgNumber, Params.PgSize
        //         );
        // }



        // public async Task<PagedList<Product>> GetAllProductAsync(Params parameters)
        // {
        //      IQueryable<Product> query = GetAll().OrderBy(_by => _by.Name)
        //     .Where(p => p.Name.ToLower().Contains(parameters.Term.ToLower()));
        //     return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        // }
        public async Task<PagedList<Product>> GetAllProductAsync(Params parameters)
        {

        
                IQueryable<Product> query =
                GetAll().OrderBy(o => o.Name).Where(p => p.Name.ToLower().Contains(parameters.Term));
                return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);

          
        }




    }
}