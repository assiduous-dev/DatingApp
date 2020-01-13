using System.Threading.Tasks;
using Datingapp.API.Models;

namespace Datingapp.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string pssword);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}