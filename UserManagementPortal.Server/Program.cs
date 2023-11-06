using Grpc.Net.Client;
using UserManagement.Models;

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

app.MapGet("/users", async () =>
{
    var channel = GrpcChannel.ForAddress("https://localhost:7073");
    var grpcClient = new UserManagement.Grpc.Service.UserService.UserServiceClient(channel);

    var response = await grpcClient.GetUsersAsync(new UserManagement.Grpc.Service.GetUsersRequest());
    app.Logger.LogInformation("Grpc result: {grpcResult}", response);
    var users = response.Users.Select(u => new User(u.Name, u.Age, u.Address)).ToArray();
    app.Logger.LogInformation("Mapped items: {items}", string.Join(';', (object[])users));
    return users;
})
.WithName("GetUsers")
.WithOpenApi();

app.MapFallbackToFile("/index.html");

app.Run();
