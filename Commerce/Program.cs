using System.Reflection;
using System.Text.Json.Serialization;
using Commerce.Data;
using Commerce.Middleware;
using Commerce.Services;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Azure;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddMediatR(Assembly.GetExecutingAssembly());
builder.Services.AddDbContext<CommerceDbContext>(options =>
  options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAzureClients(clientBuilder =>
{
    clientBuilder.AddBlobServiceClient(builder.Configuration.GetConnectionString("StorageAccount"));
});

builder.Services.AddTransient<IStorageService, AzureBlobStorageService>();
builder.Services.AddTransient<AuthMiddleware>();

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
})
.AddCookie(options =>
{
    options.Cookie.Name = "commerce";
    options.SlidingExpiration = true;
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
})
.AddOpenIdConnect("keycloak", options =>
{
    options.Authority = $"http://localhost:8080/realms/Commerce";
    options.UsePkce = true;
    options.ClientId = "commerce";
    options.ClientSecret = "50xe2tsBMfOvqK7V5YOwgLjhNySFJ4KZ";
    options.RequireHttpsMetadata = false;
    options.ResponseType = OpenIdConnectResponseType.Code;
    options.CallbackPath = new PathString("/callback");
    options.Scope.Clear();
    options.Scope.Add("openid");
});

builder.Services
    .AddGraphQLServer()
    .AddCommerceTypes()
    .RegisterDbContext<CommerceDbContext>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();

app.UseMiddleware<AuthMiddleware>();

app.MapGraphQL();

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");



app.MapFallbackToFile("index.html"); ;

app.Run();

