// PaymentSuccess.jsx
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

 

  return (
    <div className="p-5">
        {sessionId ? (
            <>
     <h1>🎉 Payment Successful!</h1>
      <p>Your ad is now featured.</p>
      </>
        ):(
            <h1> Your payment failed</h1>
        )}
        <Link to='/my-profile'>
 <button className="font-normal text-base text-white bg-gray-300 px-4 py-2 rounded-md">Go to Ads</button>
        </Link>
    </div>
  );
}
