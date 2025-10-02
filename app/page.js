"use client";

import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxWidth="sm">
      <Box
        mt={8}
        p={4}
        border={1}
        borderColor="grey.400"
        borderRadius={2}
        textAlign="center"
      >
        <Typography variant="h3" color="primary" gutterBottom>
          Customer Management v1.0
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome! This is the final exam app.  
          Manage customers — add, view, edit, and delete records.
        </Typography>

        <Stack direction="column" spacing={2} mt={3}>
          <Button
            component={Link}
            href="/customer"
            variant="contained"
            color="primary"
          >
            View Customers
          </Button>
          <Button
            component={Link}
            href="/customer/add"
            variant="outlined"
            color="success"
          >
            Add Customer
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}