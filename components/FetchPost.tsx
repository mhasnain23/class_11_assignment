"use client";
import { useState, useEffect } from "react";

interface PostT {
  title: string;
  userId: number;
  id: number;
  body: string;
}

const FetchPostPage = () => {
  const [data, setData] = useState<PostT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/external", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black p-4">
      <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
        Posts
      </h1>
      {loading ? (
        <p className="text-center text-lg font-medium text-gray-600">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-3">{item.body}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    User ID: {item.userId}
                  </span>
                  <button className="text-sm text-blue-500 hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No data available
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchPostPage;
