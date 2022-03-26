using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Repository.Contracts
{
    public interface IRepository<T>
    {
        IQueryable<T> GetAll();
        Task<T> GetAById(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> Save();
      //  Task<List<T>> SearchPg<Type>(int pgNumber, int pgSize)where Type: class;
        int GetAmountRecords();
    }
}