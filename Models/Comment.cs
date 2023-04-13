using System.ComponentModel.DataAnnotations.Schema;
using WebApi_Angular_Proj.Models;

namespace WebApplication1.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public virtual ApplicationUser? ApplicationUser { get; set; }
        public string? ApplicationUserId { get; set; }
        [ForeignKey("post")]
        public int PostId { get; set; }
        public virtual Post post { get; set; }
        public string Content { get; set; }
        public DateTime date { get; set; }
        public string Likes { get; set; }
    }
}
