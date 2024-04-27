export  const HandleDeals = ({
  discount_percentage,
}: {
  discount_percentage: number;
}) => {
  if (!discount_percentage || discount_percentage <= 5) {
    return;
  } else if (discount_percentage <= 20 && discount_percentage >= 5) {
    return (
      <div className="bg-green-600/20 text-green-700 font-semibold rounded-b-sm  p-1  text-sm">
        Deal
      </div>
    );
  } else if (discount_percentage <= 50 && discount_percentage >= 20) {
    return (
      <div className="bg-green-600/20 text-green-700 font-semibold  rounded-b-sm p-1  text-sm">
        Beg Deal Sale
      </div>
    );
  } else if (discount_percentage >= 50) {
    return (
      <div className="bg-red-600/20 text-red-700 font-semibold  rounded-b-sm p-1  text-sm">
        Mega Deal
      </div>
    );
  }
};