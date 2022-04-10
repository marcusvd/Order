using System.Threading.Tasks;
using Repository.Contracts;
using Repository.Data;
using Repository.Operations;

namespace UnitOfWork.Contracts
{
    public interface IUnitOfWork
    {
          //Task<ProductRepository> PRO_REPO_MTD(); 
          ProductRepository PRO_REPO {get;}
          UnitOfMeasureRepository UNITOFMEASURE_REPO {get;}
          CategoryRepository CAT_REPO {get;}
          SubCategoryRepository SUBCAT_REPO {get;}
          Task<bool> Save();
    }
}