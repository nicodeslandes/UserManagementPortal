using UserManagement.Models;

namespace UserManagement.GrpcMapping;

public static class GrpcUserExtensions
{
    public static User ToModel(this UserManagement.Grpc.Schema.User user)
    {
        return new(user.Name, user.Age, user.Address);
    }

}
