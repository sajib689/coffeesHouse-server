"use client";
import { useGetCoffeesQuery } from "@/features/coffees/coffeesApi";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Loader from "@/util/Loader";

const HotCoffees = () => {
  const { data: coffees = [], isLoading } = useGetCoffeesQuery();
  const {user} = useContext(AuthContext)
  // Filter only Hot Coffee
  const hotCoffees = coffees.filter(
    (coffee) => coffee.category === "Hot Coffee"
  );

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#6F4F37] mb-10">
        Hot Coffees
      </h2>

      {isLoading ? (
        <Loader/>
      ) : hotCoffees.length === 0 ? (
        <p className="text-center text-red-500">No hot coffee available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotCoffees?.map((coffee) => (
            <div
              key={coffee._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out overflow-hidden"
            >
              <img
                src={coffee.image}
                alt={coffee.name}
                className="h-60 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#6F4F37] mb-2">
                  {coffee.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{coffee.category}</p>
                <p className="text-gray-700 text-sm mb-4">{coffee.description}</p>
                <p className="text-lg font-semibold text-[#6F4F37] mb-4">
                  ${coffee.price}
                </p> {/* Price Display */}
                {/* Buy Now Button */}
                {
                  !user?.email ?
                  <Link
                  href={`/login`}
                  className="w-full py-2 px-4 bg-[#a59385] text-white font-semibold rounded-md hover:bg-[#4e3f29] transition duration-300 ease-in-out"
                >
                  Buy Now
                </Link>
                :
                <Link
                  href={`/details/${coffee?._id}`}
                  className="w-full py-2 px-4 bg-[#6F4F37] text-white font-semibold rounded-md hover:bg-[#4e3f29] transition duration-300 ease-in-out"
                >
                  Buy Now
                </Link>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotCoffees;
