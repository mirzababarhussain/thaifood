// RestaurantPage.jsx
import { useState } from "react";
import RestaurantList from "@/components/RestaurantList";
import DishList from "@/components/DishList";

function RestaurantPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleRestaurantClick = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <RestaurantList onRestaurantClick={handleRestaurantClick} />
      </div>
      <div>
        <DishList restaurantId={selectedRestaurant} />
      </div>
    </div>
  );
}

export default RestaurantPage;