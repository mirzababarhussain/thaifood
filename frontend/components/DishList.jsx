// DishList.jsx
import { gql, useQuery } from "@apollo/client";
import Loader from "./Loader";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

const QUERY = gql`
query ($id: ID!) {
    restaurant(id: $id) {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
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
      }
    }
  }
`;

const QUERY_MAIN = gql`
query {
  dishes {
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

function DishCard({ data }) {
    const { addItem, setShowCart } = useAppContext();
  
    function handleAddItem() {
      addItem(data);
      setShowCart(true);
    }
  
    return (
        <div className="bg-white border-2 border-slate-200 shadow-lg transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
        <button
          className="flex items-center w-full px-4 py-2 bg-white focus:outline-none"
          onClick={handleAddItem}
        >
            
          <div className="p-8">
            <div className="group inline-block mb-4" href="#">
              <h3 className="font-heading text-xl text-gray-900 hover:text-gray-700 group-hover:underline font-black">
                {data.attributes.name}
              </h3>
              <div >
          <Image
            width={150}
            height={150}
            className="w-64 mx-auto transform transition duration-300 hover:scale-105"

            src={`${process.env.STRAPI_URL || "http://localhost:1337"}${
              data.attributes.image.data.attributes.url
            }`}
            alt=""
          />
          </div>
              <h2>SAR{data.attributes.price}</h2>
            </div>
            <p className="text-sm text-gray-500 font-bold">
              {data.attributes.description}
            </p>
            
          </div>
          
          </button>
          <div className="flex flex-wrap md:justify-center -m-2">
              <div className="w-full md:w-auto p-2 my-6">
                <button
                  className="block w-full px-12 py-3.5 text-lg text-center border-2 border-sky-500 bg-white text-sky-500 hover:bg-sky-600 hover:border-sky-600 hover:text-white focus:text-white focus:bg-sky-600 focus:border-sky-600 rounded-full"
                  onClick={handleAddItem}
                >
                  Add to Cart
                </button>
              </div>
            </div>
    </div>
    );
  }
function DishList({ restaurantId }) {
  if(restaurantId > 0){
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: restaurantId ? restaurantId : 1},
  });
  if (error) return <p>No Menu Found</p>;
  if (loading) return <Loader />;
  if (data.restaurant.data.attributes.dishes.data.length) {
    const { restaurant } = data;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {restaurant.data.attributes.dishes.data.map((res) => {
                return <DishCard key={res.id} data={res} />;
              })}
              
    </div>
    
  )}
}else{
  const { loading, error, data } = useQuery(QUERY_MAIN);
  if (error) return <p>No Menu Found</p>;
  if (loading) return <Loader />;
  if (data.dishes.data.length) {
    const { dishes } = data;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
     
      {dishes.data.map((res) => {
                return <DishCard key={res.id} data={res} />;
              })}
              
    </div>
    
  )}
}
}

export default DishList;
