using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Models;

namespace WebApi_Angular_Proj.Repository
{
    public class FrindRequestRepository : IFrindRequestRepository
    {
        Context Context;

        public FrindRequestRepository(Context _context)
        {
            Context = _context;
        }

        public void SendRequest(RequestDTO request)
        {
            Requests Request = new Requests
            {
                FromId = request.FromId,
                ToId = request.ToId,
                Date = DateTime.Now,
                status = "Pendding",
            };

            Context.Requests.Add(Request);
            Context.SaveChanges();
        }


        public void AcceptRequest(string FromId, string ToId)
        {
            Requests Request = Context.Requests.FirstOrDefault(r => r.FromId == FromId && r.ToId == ToId);
            Request.status = "Accept";
            Context.SaveChanges();
        }
        public void RejectRequest(string FromId, string ToId)
        {
            Requests Request = Context.Requests.FirstOrDefault(r => r.FromId == FromId && r.ToId == ToId);
            Request.status = "Rejected";
            Context.SaveChanges();
        }
    }
}
