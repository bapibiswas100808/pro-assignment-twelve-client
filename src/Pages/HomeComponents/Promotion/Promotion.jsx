const Promotion = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0">
      <h2 className="text-3xl font-bold text-center py-10">
        Our Promotional Activities
      </h2>
      <div>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="flex-1">
              <img
                src="https://i.ibb.co/RTNCDL8/four.jpg"
                className=" rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">Find a Suitable Offer!</h1>
              <p className="my-2">
                <span className="text-lg font-semibold mr-2">
                  Discounts for Regular Checkups:
                </span>
                We Offer discounted rates for regular health checkups to
                encourage preventive healthcare.
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold mr-2">
                  Referral Programs:
                </span>
                Incentivize existing patients to refer friends and family by
                offering discounts or free services for successful referrals.
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold mr-2">
                  Health Awareness Events:
                </span>
                We host health awareness events or webinars covering topics like
                nutrition, mental health, or chronic disease management.
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold mr-2">
                  Student Discounts:
                </span>
                We Offer discounted rates for students on health screenings or
                consultations to cater to this demographic.
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold mr-2">
                  Community Outreach Programs:
                </span>
                We organize community health camps or workshops in underserved
                areas to provide free or subsidized health services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
