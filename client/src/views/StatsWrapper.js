import React from 'react'
import { useAuth0 } from "../react-auth0-spa";
import Stats from "./Stats"
import Loading from "../components/Loading";

const { loading, user } = useAuth0();

export default function StatsWrapper() {
    if (loading && !user) {
        return <Loading />;
      }

    return (
        <div>
            <Stats user={user} />
        </div>
    )
}
