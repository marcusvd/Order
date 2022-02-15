using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Repository.Operations
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly OSDbContext _CONTEXT;
        public Repository(OSDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void Add(T entity)
        {
            _CONTEXT.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _CONTEXT.Set<T>().Remove(entity);
        }

        public async Task<T> GetAById(Expression<Func<T, bool>> predicate)
        {
            return await _CONTEXT.Set<T>().AsNoTracking().SingleOrDefaultAsync(predicate);
        }
        public IQueryable<T> GetAll()
        {
            return _CONTEXT.Set<T>().AsNoTracking();
        }

        public void Update(T entity)
        {
            _CONTEXT.Entry(entity).State = EntityState.Modified;
            _CONTEXT.Set<T>().Update(entity);
        }
        public async Task<bool> Save()
        {
            if (await _CONTEXT.SaveChangesAsync() > 1)
            {
                return true;
            }
            return false;
        }

        public Task<List<T>> SearchPg<Type>(int pgNumber, int pgSize) where Type : class
        {
            return _CONTEXT.Set<T>().AsNoTracking()
            .Skip(pgNumber *  (pgSize -1))
            .Take(pgSize).ToListAsync();
        }

        public int GetAmountRecords()
        {
            return  _CONTEXT.Set<T>().AsNoTracking().Count();
        }
    }
}