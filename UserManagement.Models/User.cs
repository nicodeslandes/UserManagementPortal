namespace UserManagement.Models;

public record User(
    string Name,
    int Age,
    string? Address = null,
    double Score = 0.0,
    TimeSpan? PersonalBest = null);