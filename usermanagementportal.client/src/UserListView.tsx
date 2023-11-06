import { useEffect, useState } from "react";
import User from "./User";

export default function () {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        setTimeout(async () => {
            const results = await fetch('users');
            if (results.ok) {
                const retrievedUsers = await results.json();
                setUsers(retrievedUsers);
            }
        });
    });

    return (
        !users ? (
            <div>Loading users</div>
        ) : (<>
                <div>Users:</div>
                {users.map(u => <div>User {u.name} (age {u.age})</div>)}
            </>
        )
    );
}