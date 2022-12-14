using Microsoft.AspNetCore.HttpOverrides;
using OpenIddict.Validation.AspNetCore;

namespace PW.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin();
                            //.AllowCredentials();
                            //.WithOrigins("http://localhost:4200")
                            //.SetIsOriginAllowedToAllowWildcardSubdomains()
                            //.AllowAnyHeader()
                            //.AllowAnyMethod();
                    });
            });
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
            });

            // Register the OpenIddict validation components.
            builder.Services.AddOpenIddict()
                .AddValidation(options =>
                {
                    // Note: the validation handler uses OpenID Connect discovery
                    // to retrieve the address of the introspection endpoint.
                    options.SetIssuer("http://idp");
                    //options.AddAudiences("rs_dataEventRecordsApi");

                    // Configure the validation handler to use introspection and register the client
                    // credentials used when communicating with the remote introspection endpoint.
                    options.UseIntrospection()
                            .SetClientId("rs_dataEventRecordsApi")
                            .SetClientSecret("dataEventRecordsSecret");

                    // Register the System.Net.Http integration.
                    options.UseSystemNetHttp();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });

            builder.Services.AddControllers();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseRouting();
            app.UseCors("AllowAllOrigins");

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}