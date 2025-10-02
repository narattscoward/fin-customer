"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container, Typography, TextField, Button, Box, Alert, Paper
} from "@mui/material";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function CustomerDetail() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", dateOfBirth: "", memberNumber: "", interests: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadCustomer = async () => {
      const res = await fetch(`${API_BASE}/customer/${id}`);
      const data = await res.json();
      setForm({
        name: data.name || "",
        dateOfBirth: data.dateOfBirth?.substring(0, 10) || "",
        memberNumber: data.memberNumber || "",
        interests: data.interests || "",
      });
    };
    loadCustomer();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.dateOfBirth || !form.memberNumber) {
      setError("All required fields must be filled.");
      return;
    }
    await fetch(`${API_BASE}/customer/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/customer");
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          ✏️ Edit Customer
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField label="Full Name" name="name" fullWidth margin="normal" required value={form.name} onChange={handleChange} />
          <TextField label="Date of Birth" type="date" name="dateOfBirth" fullWidth margin="normal" required InputLabelProps={{ shrink: true }} value={form.dateOfBirth} onChange={handleChange} />
          <TextField label="Member Number" name="memberNumber" type="number" fullWidth margin="normal" required value={form.memberNumber} onChange={handleChange} />
          <TextField label="Interests" name="interests" fullWidth margin="normal" value={form.interests} onChange={handleChange} />

          <Box mt={3} display="flex" gap={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update
            </Button>
            <Button type="button" variant="outlined" color="secondary" fullWidth onClick={() => router.push("/customer")}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}