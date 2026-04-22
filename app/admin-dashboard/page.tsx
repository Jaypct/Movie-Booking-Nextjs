import React from "react";
import { getUserData } from "../actions/auth";

const page = async () => {
  const { isAuthenticated, userName, role } = await getUserData();
  if (role === "user") {
    return <div>You are not Authenticated</div>;
  }
  return (
    <div>
      <h1>welcome admin</h1>
    </div>
  );
};

export default page;
