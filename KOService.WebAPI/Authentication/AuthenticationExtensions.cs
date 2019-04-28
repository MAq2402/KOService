using KOService.Domain.Authentication;
using KOService.Domain.DbContexts;
using KOService.WebAPI.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace KOService.WebAPI.Authentication
{
    public static class AuthenticationExtensions
    {
        public static void ConfigureAuthentication(this IServiceCollection services, IConfiguration configuration, SymmetricSecurityKey securityKey)
        {
            var jwtAppSettingOptions = configuration.GetSection(nameof(JwtIssuerOptions));

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
                options.SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            });

            TokenValidationParameters tokenValidationParameters = CreateTokenValidationParameters(securityKey, jwtAppSettingOptions);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            services.AddAuthorization(config =>
            {
                config.AddPolicy(Constants.Roles.Mechanic,
                                 policy => policy.RequireClaim(Constants.ClaimTypes.EmployeeRole, Constants.Roles.Mechanic));
                config.AddPolicy(Constants.Roles.Manager,
                                 policy => policy.RequireClaim(Constants.ClaimTypes.EmployeeRole, Constants.Roles.Manager));
                config.AddPolicy(Constants.Roles.Admin,
                                 policy => policy.RequireClaim(Constants.ClaimTypes.EmployeeRole, Constants.Roles.Admin));
            });

            services.AddSingleton<IJwtFactory, JwtFactory>();

            var builder = services.AddIdentityCore<Identity>(o =>
            {
                o.Password.RequireDigit = false;
                o.Password.RequireLowercase = false;
                o.Password.RequireUppercase = false;
                o.Password.RequireNonAlphanumeric = false;
                o.Password.RequiredLength = 1;
                o.Password.RequiredUniqueChars = 0;
            });

            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder.AddEntityFrameworkStores<KOServiceDbContext>().AddDefaultTokenProviders();
        }
        private static TokenValidationParameters CreateTokenValidationParameters(SymmetricSecurityKey securityKey, IConfigurationSection jwtAppSettingOptions)
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)],

                ValidateAudience = true,
                ValidAudience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)],

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securityKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        }
    }
}
