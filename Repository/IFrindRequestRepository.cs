using WebApi_Angular_Proj.DTO;

namespace WebApi_Angular_Proj.Repository
{
    public interface IFrindRequestRepository
    {
        public void SendRequest(RequestDTO request);
        public void AcceptRequest(string UserId, string FrindId);
        public void RejectRequest(string UserId, string FrindId);
    }
}
