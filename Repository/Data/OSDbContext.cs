using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;



namespace Repository.Data
{
    public class OSDbContext : IdentityDbContext
    {
        public DbSet<Category> Categories {get;set;}
        public DbSet<Product> Products {get;set;}
        public DbSet<UnitOfMeasure> UnitsOfMeasures {get;set;}
        public OSDbContext(DbContextOptions<OSDbContext> opt) : base(opt)
        { }
    }
}
