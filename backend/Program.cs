using CompanyAPI.Data;   // Add this at the top

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// ✅ Add controllers support
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// ✅ Register repositories for Dependency Injection
builder.Services.AddScoped<DepartmentRepository>();
builder.Services.AddScoped<EmployeeRepository>();

// ✅ Allow React on port 3000 to call this API
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReact", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// ✅ Use CORS policy BEFORE MapControllers
app.UseCors("AllowReact");

app.UseHttpsRedirection();

// ✅ Map controller routes
app.MapControllers();

// Keep your original weatherforecast endpoint
var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}