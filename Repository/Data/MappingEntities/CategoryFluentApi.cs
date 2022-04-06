using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.MappingEntities
{
    public class CategoryFluentApi : IEntityTypeConfiguration<Category>
    {

        public void Configure(EntityTypeBuilder<Category> builder)
        {
          // builder
          // .HasMany(_Subcategory => _Subcategory.SubCategories).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}
