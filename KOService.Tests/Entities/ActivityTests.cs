using KOService.Domain.Entities;
using KOService.Domain.Enums;
using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace KOService.Tests.Entities
{
    public class ActivityTests
    {
        [Fact]
        public void ChangeToInProgressShouldWork()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            activity.ChangeToInProgress();

            Assert.Equal(ActivityStatus.InProgress, activity.GetStatus());
        }

        [Fact]
        public void CancelShouldWork()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            activity.ChangeToInProgress();
            activity.Cancel("some reason");

            Assert.Equal(ActivityStatus.Canceled, activity.GetStatus());
        }

        [Fact]
        public void CancelShouldNotWorkWhenResulIsNotProvided()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            activity.ChangeToInProgress();
            Action action = () => activity.Cancel("");

            Assert.Throws<DomainException>(action);
        }

        [Fact]
        public void CancelShouldNotWorkWhenRepairStatusIsOpen()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            Action action = () => activity.Cancel("some reason");

            Assert.Throws<DomainException>(action);
        }

        [Fact]
        public void FinishShouldWork()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            activity.ChangeToInProgress();
            activity.Finish("");

            Assert.Equal(ActivityStatus.Finished, activity.GetStatus());
        }

        [Fact]
        public void FinishShouldNotWorkWhenRepairStatusIsOpen()
        {
            var activity = new Activity(Guid.NewGuid(), Guid.NewGuid(), "desc", 0);

            Action action = () => activity.Finish("some reason");

            Assert.Throws<DomainException>(action);
        }
    }
}
