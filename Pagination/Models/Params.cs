
namespace Pagination.Models
{
    public class Params
    {
        const int maxPgSize = 50;
        public int PgNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PgSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPgSize) ? maxPgSize : value;
            }
        }

    }

}