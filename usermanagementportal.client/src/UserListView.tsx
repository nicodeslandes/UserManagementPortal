import { useEffect, useState } from "react";
import User from "./User";
import _ from "lodash";

export default function () {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchAndDisplayUsers = async () => {
        const results = await fetch('users');
        if (!results.ok) {            
            const text = await results.text();
            console.warn("Error:", text);
            setError(`Failed to fetch users: ${results.statusText} ${text.replace("\n", "<br>\n")}`);
            return;
        }

        try {
            const retrievedUsers = await results.json();
            setUsers(retrievedUsers);
        } catch (error) {
            if (error instanceof Error)
                setError(error.message);
        }
    };

    useEffect(() => {
        setTimeout(fetchAndDisplayUsers, 1000);
    }, []);

    const reload = async () => {
        setError(null);
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