// eslint-disable-next-line no-unused-vars
import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BasicBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "white" }}>
        <Link underline="hover" color="white" href="/">
          MUI
        </Link>
        <Link underline="hover" color="white" href="/material-ui/getting-started/installation/">
          Core
        </Link>
        <Typography sx={{ color: "white" }}>Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  );
}
