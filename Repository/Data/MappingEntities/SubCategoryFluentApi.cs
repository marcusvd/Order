using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.MappingEntities
{
    public class SubCategoryFluentApi : IEntityTypeConfiguration<SubCategory>
    {

        public void Configure(EntityTypeBuilder<SubCategory> builder)
        {
          //  builder.HasOne<Category>().WithOne().HasForeignKey<SubCategory>().IsRequired();
        }
    }
}
