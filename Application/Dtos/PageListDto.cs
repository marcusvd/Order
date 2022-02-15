using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Dtos
{

    public class PageListDto
    {
        public int TotalCount {get;set;} = 0 ;
        public int PgSize {get;set;}
        public int CurrentPg {get;set;}
        public int TotalPgs {get;set;}
        public bool HasNext {get;set;}
        public bool HasPrevious {get;set;}
         public List<ProductDto> Products {get; set;}
    }




}