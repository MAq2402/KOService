﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using KOService.Domain.DbContexts;
using KOService.Domain.Exceptions;
using KOService.WebAPI.Authentication;
using KOService.WebAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using KOService.Application.Services;
using KOService.Application.Handlers.Repair;
using MediatR.Pipeline;

namespace KOService.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
                               options.AddPolicy(Constants.Cors.AppPolicy, p => p.WithOrigins("http://localhost:4200")
                                                                        .AllowAnyMethod()
                                                                        .AllowAnyHeader()
                                                                        .AllowCredentials()));


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddDbContext<KOServiceDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.ConfigureAuthentication(Configuration, new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Security:secretKey"])));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "KOService", Version = "v1" });
            });
          
            services.AddMediatR(Assembly.Load(new AssemblyName("KOService.Application")));

            var address = Configuration["Mail:address"];
            var password = Configuration["Mail:password"];
            services.AddTransient<IMailSender>(s => new MailSender(address, password));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.ConfigureExceptionHandling();

            app.UseAuthentication();

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "KOService");
            });

            AutoMapperConfiguration.Configure();

            app.UseHttpsRedirection();


            app.UseCors(Constants.Cors.AppPolicy);


            app.UseMvc();
        }
    }
}
