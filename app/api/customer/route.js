import dbConnect from "@/lib/db";
import Customer from "@/models/Customer";

// GET /api/customer → list all customers
export async function GET() {
  await dbConnect();
  const customers = await Customer.find();
  return Response.json(customers);
}

// POST /api/customer → create new customer
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const customer = new Customer(body);
    await customer.save();
    return Response.json(customer, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}