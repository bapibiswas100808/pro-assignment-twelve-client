const About = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0">
      <h2 className="text-3xl font-bold text-center py-10">About Us</h2>
      <div>
        <div className="hero mb-10">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="flex-1">
              <img
                src="https://i.ibb.co/t2Kg8TL/two.jpg"
                className=" rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">About Us!</h1>
              <p className="py-6">
                At Med Diagnostic, we are committed to providing exceptional
                healthcare services tailored to meet the unique needs of each
                individual. With a team of experienced professionals and
                state-of-the-art technology, we offer a comprehensive range of
                diagnostic tests and services. Our mission is to promote
                wellness, prevent illness, and ensure the well-being of our
                patients through accurate diagnosis and compassionate care.
                <br />
                With a focus on accuracy, reliability, and patient satisfaction,
                our dedicated staff strives to deliver timely results and
                personalized care for optimal health outcomes.
              </p>
              <button className="project-btn">Know More About Us!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
