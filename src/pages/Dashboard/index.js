import React from 'react'

// content component
import User from "./User";
import SuperUser from "./SuperUser";

const Dashboard = () => {

    const role = sessionStorage.key("");
    const dataUser = JSON.parse(sessionStorage.getItem(role));
    return (
        <>
            {
                role === "superUser" ? (
                    <SuperUser dataUser={dataUser} />
                ) : <User dataUser={dataUser} />
            }
        </>
    )
}

export default Dashboard
