using System;
using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.MappingEntities
{
    public class ProductFluentApi : IEntityTypeConfiguration<Product>
    {

        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasOne<Category>(_cat => _cat.Category).
           WithMany(_product => _product.Products).HasForeignKey(_f => _f.CategoryId);
            builder
            .HasOne<SubCategory>(_sub => _sub.SubCategory)
            .WithMany(_product => _product.Products).HasForeignKey(_f => _f.SubCategoryId);
            builder
            .HasOne<UnitOfMeasure>(_um => _um.UnitOfMeasure)
            .WithMany(_product => _product.Products)
            .HasForeignKey(_f => _f.UnitOfMeasureId);

            builder.Property(_n => _n.Name).HasMaxLength(150).IsRequired();
            builder.Property(_h => _h.Height).HasMaxLength(25);
            builder.Property(_w => _w.Width).HasMaxLength(25);
            builder.Property(_d => _d.Depth).HasMaxLength(25);
            builder.Property(_s => _s.Format).HasMaxLength(150);
            builder.Property(_s => _s.State).HasMaxLength(30);
            builder.Property(_s => _s.Storage).HasMaxLength(30);
            builder.Property(_m => _m.Manufacturer).HasMaxLength(150);
            builder.Property(_d => _d.Description).HasMaxLength(1000);
            builder.Property(_c => _c.Comments).HasMaxLength(1000);

        }
    }
}
