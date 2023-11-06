using Riok.Mapperly.Abstractions;
using UserManagement.Models;

namespace UserManagement.GrpcMapping;

[Mapper]
[UseStaticMapper(typeof(GrpcDefaultMappers))]
public static partial class GrpcUserExtensions
{
    public static partial User ToModel(this Grpc.Schema.User user);

    public static partial Grpc.Schema.User ToGrpc(this User user);
}
