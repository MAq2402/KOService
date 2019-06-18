using KOService.Domain.Entities;
using KOService.Domain.Enums;
using KOService.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace KOService.Tests.Entities
{
    public class RepairTests
    {
        [Fact]
        public void ChangeToInProgressShouldWork()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            repair.PricingAccepted();

            Assert.Equal(RepairStatus.InProgress, repair.GetStatus());
        }

        [Fact]
        public void CancelShouldWork()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            repair.PricingAccepted();
            repair.Cancel("some reason");

            Assert.Equal(RepairStatus.Canceled, repair.GetStatus());
        }

        [Fact]
        public void CancelShouldNotWorkWhenResulIsNotProvided()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            repair.PricingAccepted();
            Action action = () => repair.Cancel("");

            Assert.Throws<DomainException>(action);
        }

        [Fact]
        public void CancelShouldNotWorkWhenRepairStatusIsOpen()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            Action action = () => repair.Cancel("some reason");

            Assert.Throws<DomainException>(action);
        }

        [Fact]
        public void FinishShouldWork()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            repair.PricingAccepted();
            repair.Finish("");

            Assert.Equal(RepairStatus.Finished, repair.GetStatus());
        }

        [Fact]
        public void FinishShouldNotWorkWhenRepairStatusIsOpen()
        {
            var repair = new Repair(Guid.NewGuid(), "desc", Guid.NewGuid(), Guid.NewGuid());

            Action action = () => repair.Finish("some reason");

            Assert.Throws<DomainException>(action);
        }
    }
}
