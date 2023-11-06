import { useEffect, useState } from "react";
import User from "./User";

export default function () {
    const [users, setUsers] = useState<User[]>([]);

    const fetchAndDisplayUsers = async () => {
        const results = await fetch('users');
        if (results.ok) {
            const retrievedUsers = await results.json();
            setUsers(retrievedUsers);
        }
    };

    useEffect(() => {
        setTimeout(fetchAndDisplayUsers, 1000);
    }, []);

    const reload = async () => {
        setUsers([]);
        await fetchAndDisplayUsers();
    };

    return (
        !users ? (
            <div>Loading users</div>
        ) : (<>
                <button onClick={reload}>Reload</button>
                <div>Users:</div>
                {users.map(u => <div>User {u.name} (age {u.age})</div>)}
            </>
        )
    );
}