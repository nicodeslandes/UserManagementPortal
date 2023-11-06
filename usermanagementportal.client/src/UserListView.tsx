import { useEffect, useState } from "react";
import User from "./User";

export default function () {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        setTimeout(() => setUsers([{ name: 'Nico', age: 42 }]), 1000);
    })

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