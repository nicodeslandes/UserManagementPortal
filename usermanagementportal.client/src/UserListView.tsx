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

    if (!users && !error) {
        return (
            <div>Loading users</div>
        );
    }
    
    return (
        <>
            <button onClick={reload}>Reload</button>
            {
                error ? (
                    <p> Error: <div dangerouslySetInnerHTML={{ __html: error }} /></p >
                ) : (
                    <>
                            <div>Users:</div>
                            {users.map(u => <div key={u.name}>User {u.name} (age {u.age}) scored {u.score} - Personal Best: {u.personalBest}</div>)}
                    </>
                )
            }
        </>);
}