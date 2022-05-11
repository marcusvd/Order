using System.Threading.Tasks;
using UnitOfWork.Contracts;
using Repository.Data;
using Repository.Operations;



namespace UnitOfWork.Operations
{
    public class Worker : IUnitOfWork
    {
        public readonly OSDbContext _CONTEXT;
        private ProductRepository _PRO_REPO;
        private CategoryRepository _CAT_REPO;
        private SubCategoryRepository _SUBCAT_REPO;
        private MeasureRepository _UNITOFMEASURE_REPO;
        public Worker(OSDbContext CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public ProductRepository PRO_REPO
        {
            get
            {
                return _PRO_REPO = _PRO_REPO ?? new ProductRepository(_CONTEXT);
            }

        }

        public CategoryRepository CAT_REPO
        {
            get
            {
                return _CAT_REPO = _CAT_REPO ?? new CategoryRepository(_CONTEXT);
            }
        }
        public SubCategoryRepository SUBCAT_REPO
        {
            get
            {
                return _SUBCAT_REPO = _SUBCAT_REPO ?? new SubCategoryRepository(_CONTEXT);
            }
        }

        public MeasureRepository UNITOFMEASURE_REPO
        {
            get
            {
                return _UNITOFMEASURE_REPO = _UNITOFMEASURE_REPO ?? new MeasureRepository(_CONTEXT);
            }
        }


        public async Task<bool> Save()
        {
            if (await _CONTEXT.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
        public async void Disposible()
        {
            await _CONTEXT.DisposeAsync();
        }

    }
}