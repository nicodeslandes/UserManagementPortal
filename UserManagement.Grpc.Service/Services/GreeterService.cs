using Grpc.Core;

namespace UserManagement.Grpc.Service.Services;

public class UserService: Service.UserService.UserServiceBase
{
    private readonly ILogger<UserService> _logger;
    public UserService(ILogger<UserService> logger)
    {
        _logger = logger;
    }
    public override Task<GetUsersReply> GetUsers(GetUsersRequest request, ServerCallContext context)
    {
        _logger.LogInformation("Retrieving users");
        var result = new GetUsersReply
        {
            Users =
            {
                new Schema.User() { Name = "Nico", Age = 42 },
                new Schema.User() { Name = "Charlie", Age = 22 },
                new Schema.User() { Name = "Sophia", Age = 49 },
            }
        };
        _logger.LogInformation("Result: {result}", result);
        return Task.FromResult(result);
    }
}
