import CommonLayout from "../common/commonLayout";
import PricePlan from "../landing/pricePlan";
import Subscribe from "../landing/subscribe";


const Price = () => {
  return (
    <div>
      <CommonLayout title='Price' parent='home'>
        <PricePlan />
        <Subscribe />
      </CommonLayout>
    </div>
  );
};

export default Price;
