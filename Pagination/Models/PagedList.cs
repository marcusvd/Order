using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Pagination.Models
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPg { get; private set; }
        public int TotalPgs { get; private set; }
        public int PgSize { get; private set; }
        public int TotalCount { get; private set; }
        public bool HasPrevious => CurrentPg > 1;
        public bool HasNext => CurrentPg < TotalPgs;

        public PagedList(List<T> items, int count, int pgNumber, int pgSize)
        {
            TotalCount = count;
            PgSize = pgSize;
            CurrentPg = pgNumber;
            TotalPgs = (int)Math.Ceiling(count / (double)pgSize);
            AddRange(items);
        }
        
        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> source, int pgNumber, int pgSize)
        {
            var count =  source.Count();
            var items = await source.Skip((pgNumber -1) * pgSize).Take(pgSize).ToListAsync();
            return new PagedList<T>(items, count, pgNumber, pgSize);
        }

    }

}