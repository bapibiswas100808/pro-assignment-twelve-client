import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider/AuthProvider";
import UseAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const CheckOutForm = ({ testDetails, payableAmount }) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: payableAmount })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, payableAmount]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);
    if (!stripe || !elements) {
      return;
    }

    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      toast.error(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // toast.success("Payment Successful");
    }
    // confirm payment
    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "aynonumys",
            email: user?.email || "aynnonymus",
          },
        },
      }
    );
    if (err) {
      console.log(err);
    } else {
      console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent.id);
        toast.success(`Payment Successful, 
        Transaction Id:${paymentIntent.id}`);
      }
    }
    // post to db
    const bookedItem = {
      email: user.email,
      testId: testDetails._id,
      image: testDetails.image,
      title: testDetails.title,
      price: testDetails.price,
      slots: testDetails.slots,
      date: testDetails.date,
      short_description: testDetails.short_description,
      report_status: "pending",
    };
    axiosPublic
      .post("/bookedTest", bookedItem)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          navigate("/allTest");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Booking is successful",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="project-btn mt-5"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now!
      </button>
    </form>
  );
};

export default CheckOutForm;
CheckOutForm.propTypes = {
  testDetails: PropTypes.object,
  payableAmount: PropTypes.string,
};
