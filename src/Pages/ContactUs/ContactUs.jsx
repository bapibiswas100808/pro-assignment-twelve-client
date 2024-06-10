import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0">
      <Helmet>
        <title>Med Diagnostic|Contact </title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center py-10">Contact Us</h2>
      <div>
        <div className="hero mb-10">
          <div className="hero-content flex-col lg:flex-row-reverse gap-10">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold">Get In Touch!</h1>
              <p className="py-3">
                At Med Diagnostic, we prioritize communication and
                accessibility. Our Contact Us page offers various channels for
                reaching out, including phone, email, and a convenient online
                form. Whether you have inquiries about our services, want to
                schedule an appointment, or need assistance, our dedicated team
                is here to assist you promptly and courteously.
              </p>
              <p className="py-2">
                <span className="text-lg font-semibold mr-2">Email:</span>
                info@meddiagnostic.com
              </p>
              <p className="py-2">
                <span className="text-lg font-semibold mr-2">Phone:</span>
                +1 (555) 123-4567
              </p>
              <p className="py-2">
                <span className="text-lg font-semibold mr-2">Address:</span>
                123 Main Street, Cityville, State, ZIP
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="project-btn">Contact Us!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
