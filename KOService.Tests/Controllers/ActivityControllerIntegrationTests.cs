using KOService.Domain.Entities;
using KOService.WebAPI;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace KOService.Tests.Controllers
{
    class ActivityControllerIntegrationTests : IClassFixture<InMemoryWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public ActivityControllerIntegrationTests(InMemoryWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task given_existing_mechanicId_returns_activities()
        {
            var httpResponse = _client.GetAsync("/api/activities/mechanic/1");

            Assert.IsType<OkObjectResult>(httpResponse.Status);

            var result = httpResponse.Result;
            var stringResult = await result.Content.ReadAsStringAsync();

            var players = JsonConvert.DeserializeObject<IEnumerable<Activity>>(stringResult);
            Assert.Contains(players, p => p.FirstName == "Wayne");
            Assert.Contains(players, p => p.FirstName == "Mario");

        }


    }
}
