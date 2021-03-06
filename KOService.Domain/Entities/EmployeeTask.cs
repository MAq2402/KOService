﻿using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KOService.Domain.Entities
{
    public abstract class EmployeeTask<T>: Entity where T : struct, IConvertible
    {
        public EmployeeTask(Guid id) : base(id)
        {

        }
        protected EmployeeTask()
        {

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
    }
}
