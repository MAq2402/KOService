﻿using KOService.Application.DTOs.Activity;
using KOService.Domain.Entities;
using KOService.WebAPI;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace KOService.Tests.Controllers
{
    public class ActivityControllerIntegrationTests : IClassFixture<InMemoryWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly ITestOutputHelper _output;

        public ActivityControllerIntegrationTests(InMemoryWebApplicationFactory<Startup> factory, ITestOutputHelper output)
        {
            _client = factory.CreateClient();
            _output = output;
        }

        [Fact]
        public async Task given_existing_repairId_returns_activities()
        {
            var httpResponse = _client.GetAsync("/api/activities/repair/f87cfd0f-1e90-4803-91fe-8269d4c69153").Result;



            var stringResult = await httpResponse.Content.ReadAsStringAsync();

            httpResponse.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
            _output.WriteLine(stringResult);

            var activities = JsonConvert.DeserializeObject<IEnumerable<ActivityDto>>(stringResult);
            Assert.NotEmpty(activities);
            Assert.Contains(activities, a => a.Description == "wymiana silnika");
        }

        [Fact]
        public void posting_valid_content_should_create_activity()
        {
            var contentObject = new
            {
                activity = new
                {
                    id = new Guid("544b9e21-d28f-4381-ac41-ada5f3f87788"),
                    description = "olej",
                    sequenceNumber = 1
                },
                repairId = new Guid("3297fa03-afa0-495c-965e-c9b3b712358f")
            };
            var content = new StringContent(JsonConvert.SerializeObject(contentObject),
        Encoding.UTF8,
        "application/json");
            var httpResponse = _client.PostAsync("/api/activities", content).Result;

            Assert.Equal(HttpStatusCode.OK, httpResponse.StatusCode);
        }

        [Fact]
        public async Task existing_worker_should_be_assigned_to_activity()
        {
            string activityId = "d2157b7a-c81e-47dc-9d5f-a4a33f5d5587";
            string mechanicId = "4cd4ac80-867c-468c-9149-8de382edef44";

            var httpResponse = _client.PutAsync($"/api/activities/{activityId}/{mechanicId}", null).Result;
            var stringResult = await httpResponse.Content.ReadAsStringAsync();

            _output.WriteLine(stringResult);
            httpResponse.EnsureSuccessStatusCode();
           
        }
    }
}