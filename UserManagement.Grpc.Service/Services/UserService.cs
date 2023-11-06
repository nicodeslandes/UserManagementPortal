using Google.Protobuf.WellKnownTypes;
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
                new Schema.User() { Name = "Nico", Age = 42, Score = 12.3, PersonalBest = TimeSpan.Parse("00:05:42.213").ToDuration() },
                new Schema.User() { Name = "Charlie", Age = 22, Score = 19.1, PersonalBest = TimeSpan.Parse("01:23:11").ToDuration() },
                new Schema.User() { Name = "Sophia", Age = 49 },
            }
        };
        _logger.LogInformation("Result: {result}", result);
        return Task.FromResult(result);
    }
}
