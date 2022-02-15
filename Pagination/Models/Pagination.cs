using System.Text.Json;
using Microsoft.AspNetCore.Http;
namespace Pagination.Models
{
    public static class Pagination
    {

        public static void AddPagination(this HttpResponse response,
                                          int CurrentPg,
                                          int itemsPerPg,
                                          int amountItems,
                                          int amountPg,
                                          bool HasNext,
                                          bool HasPrevious
                                          )
        {
            var pagination = new PaginationHeader(CurrentPg,
                                                   itemsPerPg,
                                                   amountItems,
                                                   amountPg,
                                                   HasNext,
                                                   HasPrevious
                                                   );

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };
            response.Headers.Add("Pagination", JsonSerializer.Serialize(pagination, options));

            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }




    }
}