import { Container } from "@mui/material";
import { memo } from "react";
import { CreateUserInfoPdf } from "../../../features/CreateUserInfoPdf";

const CreateUserCardPage = memo(() => {
  return (
    <Container maxWidth="sm">
      <CreateUserInfoPdf />
    </Container>
  );
});

export { CreateUserCardPage };
