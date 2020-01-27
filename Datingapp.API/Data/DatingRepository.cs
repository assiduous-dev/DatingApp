using System.Collections.Generic;
using System.Threading.Tasks;
using Datingapp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Datingapp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            this._context = context;
        }

        //Add method is not async because we are simply adding here data to
        //memory and changes are not saved to DB till we say same for delete
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            //We want to return photos here too and photos are considered navigation
            //properties so we use include. Photos list will not be automatically included
           var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);
           return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}