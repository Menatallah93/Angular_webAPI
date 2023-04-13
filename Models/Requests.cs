using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi_Angular_Proj.Models
{
    public class Requests
    {
        public int Id { get; set; }

        public string status { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("FromUser")]
        public int FromId { get; set; }
        [ForeignKey("ToUser")]
        public int ToId { get; set; }

        public virtual User FromUser { get; set; }
        public virtual User ToUser { get; set; }
    }
}
