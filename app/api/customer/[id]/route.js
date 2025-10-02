import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

// GET /api/customer/:id
export async function GET(req, { params }) {
  await dbConnect();
  const customer = await Customer.findById(params.id);
  if (!customer) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(customer);
}

// PUT /api/customer/:id
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const body = await req.json();
    const updated = await Customer.findByIdAndUpdate(params.id, body, { new: true });
    if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(updated);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

// DELETE /api/customer/:id
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const deleted = await Customer.findByIdAndDelete(params.id);
    if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ message: "Customer deleted" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}