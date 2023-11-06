using Google.Protobuf.WellKnownTypes;

namespace UserManagement.GrpcMapping;

public static class GrpcDefaultMappers
{
    public static TimeSpan MapToTimeSpan(Duration source)
        => source.ToTimeSpan();

    public static Duration MapToDuration(TimeSpan source)
        => source.ToDuration();
}