using System;
using System.Collections.Generic;
using System.Linq;

namespace KOService.Domain.Entities
{
    public abstract class EmployeeTask<T>: Entity where T : struct, IConvertible
    {
        public EmployeeTask()
        {
            Open();
        }
        protected abstract Dictionary<T, string> StatusDictionary {get;}
        public string Description { get; protected set; }
        public string Result { get;protected set; }
        public string Status { get; protected set; }
        public DateTime StartDateTime { get; protected set; }
        public DateTime? EndDateTime { get;protected set; }
        public T GetStatus()
        {
            return StatusDictionary.FirstOrDefault(x => x.Value == Status).Key;
        }
        protected void SetStatus(T status)
        {
            Status = StatusDictionary[status];
        }

        public virtual void Cancel(string result)
        {
            if (string.IsNullOrEmpty(result))
            {
                throw new ArgumentNullException("Result has not been provided, while canceling");
            }
            EndDateTime = DateTime.UtcNow;
            Result = result;
        }
        public virtual void Finish(string result)
        {
            EndDateTime = DateTime.UtcNow;
            Result = result;
        }
        public virtual void ChangeToInProgress()
        {

        }
        public virtual void Open()
        {
            StartDateTime = DateTime.UtcNow;
        }
        
    }
}
