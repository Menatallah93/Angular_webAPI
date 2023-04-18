using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Repository;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "https://localhost:4200/", headers: "*", methods: "*")]
    public class FrindController : ControllerBase
    {
        IFrindRequestRepository FrindRequest;
        public FrindController(IFrindRequestRepository _frindRequestRepository)
        {
            FrindRequest = _frindRequestRepository;
        }
        [HttpPost("SendRequset")]
        public IActionResult SendRequest(RequestDTO request)
        {

            FrindRequest.SendRequest(request);
            return Ok();
        }
        [HttpPost("Accept")]
        public IActionResult AcceptRequest(string FromId, string ToId)
        {
            FrindRequest.AcceptRequest(FromId, ToId);
            return Ok();
        }
        [HttpPost("Reject")]
        public IActionResult RejectRequest(string FromId, string ToId)
        {
            FrindRequest.RejectRequest(FromId, ToId);
            return Ok();
        }
    }
}
