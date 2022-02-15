namespace Pagination.Models
{
    public class PaginationHeader
    {
        public int CurrentPg { get; set; }
        public int ItemsPerPg { get; set; }
        public int AmountItems { get; set; }
        public int AmountPg { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }

        public PaginationHeader(int currentPg, int itemsPerPg,
        int amountItems, int amountPg, bool hasNext, bool hasPrevious)
        {
            this.CurrentPg = currentPg;
            this.ItemsPerPg = itemsPerPg;
            this.AmountItems = amountItems;
            this.AmountPg = amountPg;
            this.HasNext = hasNext;
            this.HasPrevious = hasPrevious;

        }

    }
}