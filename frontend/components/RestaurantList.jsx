// RestaurantList.jsx
import { gql, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import Loader from "./Loader";

const QUERY = gql`
  {
    restaurants {
      data {
        id
        attributes {
          name
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

function RestaurantButton({ data, onClick }) {
  const imageUrl = data.attributes.image.data[0].attributes.url;
  const restaurantName = data.attributes.name;

  return (
    <div>
      <button
        className="flex items-center w-full px-4 py-2 border-2 border-slate-200 shadow-lg bg-white hover:bg-sky-600 hover:text-white focus:text-white focus:bg-sky-600 focus:outline-none py-2 px-6 rounded-full"
        onClick={() => onClick(data.id)}
      >
        
        <div>
          <h3 className="text-lg font-semibold">{restaurantName}</h3>
        </div>
      </button>
    </div>
  );
}

function RestaurantList({ onRestaurantClick }) {
  const { loading, error, data } = useQuery(QUERY);

  if (error) return "Error loading restaurants";
  if (loading) return <Loader />;
  const router = useRouter();

  const handleMenuButtonClick = () => {
      router.push('/menu');
      router.reload();
  };
  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      <div>
      <button
        className="flex items-center w-full px-4 py-2 border-2 border-slate-200 shadow-lg bg-white hover:bg-sky-600 hover:text-white focus:text-white focus:bg-sky-600 focus:outline-none py-2 px-6 rounded-full"
        onClick={handleMenuButtonClick}
      >
        
        <div>
          <h3 className="text-lg font-semibold">All</h3>
        </div>
      </button>
    </div>
      {data.restaurants.data.map((res) => (
        <RestaurantButton
          key={res.id}
          data={res}
          onClick={onRestaurantClick}
        />
      ))}
    </div>
  );
}

export default RestaurantList;
