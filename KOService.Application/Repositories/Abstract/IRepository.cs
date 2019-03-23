using KOService.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace KOService.Domain.Repositories.Abstract
{
    public interface IRepository<T> where T: Entity
    {
        IQueryable<T> GetAll();
        T GetById(Guid id);
        IQueryable<T> FindMany(Expression<Func<T, bool>> expression);
        T FindOne(Expression<Func<T, bool>> expression);
        void Add(T newEntity);
        bool Commit();
    }
}
