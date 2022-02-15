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
        private UnitOfMeasureRepository _UMEASURE_REPO;
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

        public UnitOfMeasureRepository UMEASURE_REPO
        {
            get
            {
                return _UMEASURE_REPO = _UMEASURE_REPO ?? new UnitOfMeasureRepository(_CONTEXT);
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