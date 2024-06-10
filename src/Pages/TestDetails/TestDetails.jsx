import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "../../Components/CheckOut/CheckOutForm";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import UseAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway_key);

const TestDetails = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });
  const testDetails = useLoaderData();
  const [payableAmount, setPayableAmount] = useState(testDetails.price);
  const handleCoupon = (e) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = form.coupon.value;

    if (couponCode === "med") {
      setPayableAmount(testDetails.price - (testDetails?.price * 15) / 100);
    } else if (couponCode === "diamed") {
      setPayableAmount(testDetails.price - (testDetails.price * 30) / 100);
    } else {
      setPayableAmount(testDetails?.price);
      toast.error("coupon do not Match!");
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto">
      <Helmet>
        <title>Med Diagnostic|Test Details </title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center py-10">Test Details</h2>
      <div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row gap-10 mb-10">
            <div className="flex-1">
              <img
                src={testDetails?.image}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-8">{testDetails?.title}</h1>
              <div className="flex gap-5">
                <p>
                  <span className="text-lg font-semibold">
                    Available Slots:
                  </span>
                  {testDetails.slots}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> $
                  {testDetails?.price}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>
                  {testDetails?.date}
                </p>
              </div>
              <p className="py-6">{testDetails?.short_description}</p>
              {testDetails.slots > 0 ? (
                <button
                  disabled={userData?.status === "blocked"}
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                  className="project-btn"
                >
                  {userData?.status === "blocked"
                    ? "You are Blocked"
                    : "Book Now"}
                </button>
              ) : (
                "No slots Available"
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div>
            <p>
              <span className="text-lg font-semibold">Price of the Test:</span>${" "}
              {testDetails.price}
            </p>
            <p>
              <span className="text-lg font-semibold">
                Payable Price after Discount:
              </span>
              $ {payableAmount > 0 ? payableAmount : testDetails?.price}
            </p>
            <p>Apply Coupon:</p>
            <form onSubmit={handleCoupon}>
              <input name="coupon" className="px-3 py-2 border" type="text" />
              {payableAmount >= testDetails.price && (
                <button type="submit" className="project-btn">
                  Apply
                </button>
              )}
            </form>
          </div>
          <h3 className="font-bold text-lg mb-4">
            Give your payment information!
          </h3>
          <Elements stripe={stripePromise}>
            <CheckOutForm
              payableAmount={payableAmount}
              testDetails={testDetails}
            ></CheckOutForm>
          </Elements>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TestDetails;
