using KOService.Domain.DbContexts;
using KOService.Domain.Entities;
using KOService.Domain.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace KOService.Domain.Repositories
{
    public class Repository<T> : IRepository<T> where T:Entity
    {
        protected KOServiceDbContext _dbContext;

        public Repository(KOServiceDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public void Add(T newEntity)
        {
            _dbContext.Set<T>().Add(newEntity);
        }

        public bool Commit()
        {
            return _dbContext.SaveChanges() > 0;
        }

        public IQueryable<T> FindMany(Expression<Func<T, bool>> expression)
        {
            return _dbContext.Set<T>().Where(expression);
        }

        public T FindOne(Expression<Func<T, bool>> expression)
        {
            return _dbContext.Set<T>().FirstOrDefault(expression);
        }

        public IQueryable<T> GetAll()
        {
            return _dbContext.Set<T>();
        }

        public T GetById(Guid id)
        {
            return _dbContext.Set<T>().FirstOrDefault(x => x.Id == id);
        }
    }
}
