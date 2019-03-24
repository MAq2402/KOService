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
        ClaimsIdentity GenerateClaimsIdentity(string userName, string id);
        string GenerateJwt(ClaimsIdentity identity, string userName, JsonSerializerSettings serializerSettings);
    }
}
