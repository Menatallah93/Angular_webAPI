using WebApi_Angular_Proj.Models;

namespace WebApplication1.Models
{
    public class Post
    {
        public int Id { get; set; }
        public virtual ApplicationUser? ApplicationUser { get; set; }
        public string? ApplicationUserId { get; set; }
        public string PostContent { get; set; }
        public string File { get; set; }
        public string Like { get; set; }
        public DateTime Created { get; set; }

    }
}
