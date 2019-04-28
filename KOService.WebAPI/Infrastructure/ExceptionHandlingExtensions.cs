using KOService.Domain.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace KOService.WebAPI.Infrastructure
{
    public static class ExceptionHandlingExtensions
    {
        public static void ConfigureExceptionHandling(this IApplicationBuilder appBuilder)
        {
            appBuilder.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.ContentType = "application/json";
                    var feature = context.Features.Get<IExceptionHandlerFeature>();
                    var exception = feature.Error;
                    var message = "";
                    if (feature != null)
                    {
                        if (exception is DomainException)
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                            message = exception.Message;
                        }
                        else
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            message = "Internal Server Error";
                        }
                        await context.Response.WriteAsync(new ErrorDetails()
                        {
                            Message = message,
                            StatusCode = context.Response.StatusCode.ToString()
                        }.ToString());
                    }
                });
            });
        }
    }
}
