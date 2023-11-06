var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/users", () =>
{
    var users = new[]
    {
        new User("Nico", 42),
        new User("Bob", 31),
        new User("Alice", 22),
    };
    return users;
})
.WithName("GetUsers")
.WithOpenApi();

app.MapFallbackToFile("/index.html");

app.Run();

internal record User(string Name, int Age, string? Address = null);