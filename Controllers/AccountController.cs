
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration config;

        public Context Context { get; }

        public AccountController(UserManager<ApplicationUser> userManager, IConfiguration config,Context context) 
        {
            this.userManager = userManager;
            this.config = config;
            Context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterDTO registerDTO)
        {

            if (ModelState.IsValid)
            {
                ApplicationUser newUsr= new ApplicationUser();

                newUsr.Email = registerDTO.Email;
                newUsr.UserName= registerDTO.UserName;
                newUsr.PhoneNumber = registerDTO.Phone;

               IdentityResult result =await userManager.CreateAsync(newUsr,registerDTO.Password);

                if (result.Succeeded)
                {
                    User usr = new User();

                    usr.Id = newUsr.Id;
                    usr.Address = registerDTO.Address;
                    usr.LName = registerDTO.LName;
                    usr.FName = registerDTO.FName;
                    usr.Image = registerDTO.Image;
                    usr.FullName = $"{registerDTO.FName} {registerDTO.LName}";
                    Context.Users.Add(usr);

                    Context.SaveChanges();

                    return Ok("Done");
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDTO loginDTO)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser Usr= await userManager.FindByNameAsync(loginDTO.UserName);

                List<Claim> myClaims = new List<Claim>();
                
                myClaims.Add(new Claim(ClaimTypes.NameIdentifier, Usr.Id));
                myClaims.Add(new Claim(ClaimTypes.Name, Usr.UserName));
                myClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                var authSecritKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:SecuriytKey"]));

                SigningCredentials credentials =
                    new SigningCredentials(authSecritKey, SecurityAlgorithms.HmacSha256);

                if (Usr != null && await userManager.CheckPasswordAsync(Usr, loginDTO.Password))
                {
                    
                        JwtSecurityToken jtw = new JwtSecurityToken
                            (
                                issuer:"https://localhost:7223",
                                audience: "https://localhost:4200",
                                expires:DateTime.Now.AddHours(0.5),
                                claims: myClaims,
                                signingCredentials: credentials
                            );
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(jtw),
                        expiration = jtw.ValidTo,
                       
                });

                }
                return BadRequest("Invalid Data");
            }

            return BadRequest(ModelState);
        }
    }
}
