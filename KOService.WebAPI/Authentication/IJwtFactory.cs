using KOService.Domain.Authentication;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KOService.WebAPI.Authentication
{
    public interface IJwtFactory
    {
        string GenerateJwt(Identity identity, string userName, JsonSerializerSettings serializerSettings);
    }
}
