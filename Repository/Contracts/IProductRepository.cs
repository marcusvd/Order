using System.Threading.Tasks;
using Domain.Entities;
using Pagination.Models;



namespace Repository.Contracts
{
    public interface IProductRepository : IRepository<Product>
    {
        // Task<PageList<Product>> GetAllProductAsync(QueryParams queryParams);
        Task<PagedList<Product>> GetAllProductAsync(Params Params);
        
    
    }
}