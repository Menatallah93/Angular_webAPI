
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi_Angular_Proj.Models;
using WebApplication1.Models;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;

        public Context Context { get; }
        public ProfileController(Context context,UserManager<ApplicationUser> userManager)
        {
            Context = context;
            this.userManager = userManager;
        }
        [HttpGet("MyProfile")]
        public async Task<IActionResult> MyProfileAsync()
        {
            ApplicationUser usr = await userManager.GetUserAsync(User);
            if (usr != null)
            {
                User user = Context.Users.FirstOrDefault(u => u.Id == usr.Id);
                return Ok(user);
            }
            return BadRequest();
        }

        [HttpGet("MyPosts")]
        public IActionResult GetPosts(string id)
        {
            List<Post> posts = Context.Posts.Where(p => p.ApplicationUserId == id).ToList();
            return Ok(posts);
        }

        [HttpGet("RequetsSent")]
        public IActionResult RequetsSent(string id)
        {
            
            List<Requests> toRq = Context.Requests.Where(r => r.FromId == id).ToList();

            
            return Ok(toRq);
        }

        [HttpGet("MyConnects")]
        public IActionResult GetConnects(string id)
        {
            List<Requests> fromRq = Context.Requests.Where(r => r.FromId == id).ToList();
            List<Requests> toRq = Context.Requests.Where(r => r.ToId == id).ToList();

            List<Requests> Requests = fromRq.Concat(toRq).ToList();
            return Ok(Requests);
        }

    }
}
