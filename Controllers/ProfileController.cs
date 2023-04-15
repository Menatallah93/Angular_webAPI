
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApi_Angular_Proj.DTO;
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
            string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            ApplicationUser usr = await userManager.FindByIdAsync(userId);
            if (usr != null)
            {
                User user = Context.Users.FirstOrDefault(u => u.Id == usr.Id);
                return Ok(user);
            }
            return BadRequest();
        }

        [HttpGet("MyData/{id}")]
        public async Task<ActionResult<ProfileUpdateDTO>> GetDataAsync(string id)
        {
            User user = Context.Users.FirstOrDefault(u=> u.Id==id);
            ProfileUpdateDTO usrDto = new ProfileUpdateDTO();
            if (user != null)
            {
                usrDto.About = user.About;
                usrDto.userId = user.Id;
                usrDto.job = user.job;
                usrDto.Address = user.Address;
                usrDto.Company = user.Company;
                usrDto.Cuntry = user.Cuntry;
                usrDto.FName = user.FName;
                usrDto.TwitterLink = user.TwitterLink;
                usrDto.Phone = user.Phone;
                usrDto.FacebookLink = user.FacebookLink;
                usrDto.Image = user.Image;
                usrDto.LinkedinLink = user.LinkedinLink;
                usrDto.LName = user.LName;
                usrDto.FullName = user.FullName;
                


                return Ok(usrDto);

            }
            return BadRequest();

            }
            
        

        [HttpPut("Password")]
        public async Task<IActionResult> PasswordAsync(string id, string oldpass, string newpass)
        {
            User user = Context.Users.FirstOrDefault(u => u.Id == id);

            ApplicationUser Usr = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                if (await userManager.CheckPasswordAsync(Usr, oldpass))
                {
                    var newPasswordHash = userManager.PasswordHasher.HashPassword(Usr, newpass);


                    Usr.PasswordHash = newPasswordHash;

                    Context.SaveChanges();

                }
                else
                {
                    //RedirectToActionResult("GetAll", "ControllerName", null)
                    return Content("Old Password isn't correct");
                }

                return Ok("Done");
            }
            return BadRequest();
        }
        [HttpPut("Data/{id}")]
        public async Task<IActionResult> DataAsync(string id, ProfileUpdateDTO newuser)
        {
            User user = Context.Users.FirstOrDefault(u => u.Id == id);

            ApplicationUser Usr = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                //mapping between user and newuser
                user.About = newuser.About;
                user.Address = newuser.Address;
                user.FacebookLink = newuser.FacebookLink;
                user.LinkedinLink = newuser.LinkedinLink;
                user.InstagramLink = newuser.InstagramLink;
                user.Company = newuser.Company;
                user.Cuntry = newuser.Cuntry;
                user.FName = newuser.FName;
                user.LName = newuser.LName;
                user.FullName = $"{newuser.FName} {newuser.LName}";
                user.Image = newuser.Image;
                user.Phone = newuser.Phone;
                user.TwitterLink = newuser.TwitterLink;

                Context.SaveChanges();

                return Ok("Done");
            }
            return BadRequest();
        }

        [HttpGet("MyPosts")]
        public IActionResult GetPosts(string id)
        {
            List<Post> posts = Context.Posts.Where(p => p.UserId == id).ToList();
            return Ok(posts);
        }

        [HttpGet("RequetsSent")]
        public IActionResult RequestsSent(string id)
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
