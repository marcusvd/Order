using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Repository.Data.MappingEntities;

namespace Repository.Data
{
    public class OSDbContext : IdentityDbContext
    {
        public DbSet<Product> Products {get;set;}
        public DbSet<Category> Categories {get;set;}
        public DbSet<SubCategory> SubCategories {get;set;}
        public DbSet<Measure> Measures {get;set;}
        public OSDbContext(DbContextOptions<OSDbContext> opt) : base(opt)
        {  }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new ProductFluentApi());
            builder.ApplyConfiguration(new CategoryFluentApi());
            builder.ApplyConfiguration(new SubCategoryFluentApi());
            builder.ApplyConfiguration(new MeasureFluentApi());
            base.OnModelCreating(builder);
        }


    }
}
