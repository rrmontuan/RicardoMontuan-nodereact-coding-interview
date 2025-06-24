import React, { FC, useState, useEffect } from "react";

import { RouteComponentProps } from "@reach/router";
import { IUserProps } from "../dtos/user.dto";
import { UserCard } from "../components/users/user-card";
import { CircularProgress } from "@mui/material";

import { BackendClient } from "../clients/backend.client";

const backendClient = new BackendClient();

export const DashboardPage: FC<RouteComponentProps> = () => {
  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await backendClient.getAllUsers();
      setUsers(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const searchPeopleByTag = async (term: string) => {
    setLoading(true);
    const result = await backendClient.getAllUsers(term);
    setUsers(result.data);
    setLoading(false);
  }

  return (
    <div style={{ paddingTop: "30px" }}>
      <input name="search" onChange={event => searchPeopleByTag(event.target.value)}/>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress size="60px" />
          </div>
        ) : (
          <div>
            {users.length
              ? users.map((user) => {
                  return <UserCard key={user.id} {...user} />;
                })
              : null}
          </div>
        )}
      </div>
      <div>
        <button>Previous Page</button>
        <button>Next Page</button>
      </div>
    </div>
  );
};
