import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { amount, customerName, customerPhone, customerEmail } = await request.json();
    
    // Using environment variables for Security (GitHub blocks hardcoded keys)
    const appId = process.env.NEXT_PUBLIC_CASHFREE_APP_ID || process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    
    if (!appId || !secretKey) {
       console.error("Missing Cashfree API Keys in local environment!");
       return NextResponse.json({ error: "Server Configuration Error: Missing Payment API Keys." }, { status: 500 });
    }
    
    const orderId = `order_${Date.now()}`;

    const response = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_amount: amount,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_phone: customerPhone || "9999999999",
          customer_email: customerEmail || "fan@example.com",
          customer_name: customerName || "Cricket Fan",
        },
        order_meta: {
          // Tell Cashfree to redirect back to our confirmation page upon success
          return_url: `${request.headers.get('origin') || 'https://ipl-booking-app.com'}/confirmation?order_id={order_id}`,
        }
      }),
    });

    const data = await response.json();
    
    if (data.payment_session_id) {
      return NextResponse.json({ paymentSessionId: data.payment_session_id, orderId: data.order_id });
    } else {
      console.error("Cashfree Error:", data);
      return NextResponse.json({ error: data.message || "Failed to create order" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Order Creation Exception:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
