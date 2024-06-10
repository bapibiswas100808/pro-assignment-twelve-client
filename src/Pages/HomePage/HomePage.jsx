import { Helmet } from "react-helmet-async";
import Banner from "../HomeComponents/Banner/Banner";
import FeaturedTest from "../HomeComponents/FeaturedTest/FeaturedTest";
import Promotion from "../HomeComponents/Promotion/Promotion";
import Recommendation from "../HomeComponents/Recommendation/Recommendation";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Med Diagnostic|Home </title>
      </Helmet>
      <Banner></Banner>
      <FeaturedTest></FeaturedTest>
      <Promotion></Promotion>
      <Recommendation></Recommendation>
    </div>
  );
};

export default HomePage;
