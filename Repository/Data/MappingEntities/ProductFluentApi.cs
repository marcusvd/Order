using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Repository.Data.MappingEntities
{
    public class ProductFluentApi : IEntityTypeConfiguration<Product>
    {

        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.HasOne<Category>(_cat => _cat.Category).
           WithMany(_product => _product.Products).HasForeignKey(_f => _f.CategoryId).OnDelete(DeleteBehavior.Restrict);
            builder
            .HasOne<SubCategory>(_sub => _sub.SubCategory)
            .WithMany(_product => _product.Products).HasForeignKey(_f => _f.SubCategoryId).OnDelete(DeleteBehavior.Restrict);
            builder
            .HasOne<Measure>(_um => _um.Measure)
            .WithMany(_product => _product.Products)
            .HasForeignKey(_f => _f.MeasureId).OnDelete(DeleteBehavior.Restrict);

            builder.Property(_n => _n.Name).HasMaxLength(150).IsRequired();
            builder.Property(_m => _m.Manufacturer).HasMaxLength(150);
            builder.Property(_d => _d.Description).HasMaxLength(1000);
            builder.Property(_b => _b.BarCode).HasMaxLength(1000);

        }
    }
}