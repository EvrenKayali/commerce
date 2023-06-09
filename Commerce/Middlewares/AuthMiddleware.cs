using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Extensions;

namespace Commerce.Middleware;
public class AuthMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.Request.Path == "/login")
        {
            // await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var returnUri = context.Request.Query["returnURL"].ToString();
           // await context.ChallengeAsync("keycloak", new AuthenticationProperties() { RedirectUri = returnUri });
            return;
        }

        // if (context.User.Identity.IsAuthenticated && context.Request.Path == "/logout")
        // {
        //     await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //     await context.SignOutAsync("keycloak", new AuthenticationProperties() { RedirectUri = "/unauth" });

        //     return;
        // }

        await next(context);
    }
}