import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Section from "../components/Section";
import ButtonGradient from "../assets/svg/ButtonGradient";

const PastDrawings = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const videosPerPage = 6;

  // Simulated API data - replace with your actual API call
  const fetchVideos = async (page) => {
    setIsLoading(true);
    try {
      // Replace this with your actual API endpoint
      const mockData = [
        {
          id: 1,
          title: "Mahzooz Saturday Draw",
          date: "16 December 2023",
          videoId: "video1",
          thumbnail: "/api/placeholder/400/225",
        },
        {
          id: 2,
          title: "Mahzooz Saturday Draw",
          date: "02 December 2023",
          videoId: "video2",
          thumbnail: "/api/placeholder/400/225",
        },
        {
          id: 3,
          title: "Mahzooz Saturday Draw",
          date: "25 November 2023",
          videoId: "video3",
          thumbnail: "/api/placeholder/400/225",
        },
        {
          id: 4,
          title: "Mahzooz Saturday Draw",
          date: "18 November 2023",
          videoId: "video4",
          thumbnail: "/api/placeholder/400/225",
        },
        {
          id: 5,
          title: "Mahzooz Saturday Draw",
          date: "11 November 2023",
          videoId: "video5",
          thumbnail: "/api/placeholder/400/225",
        },
        {
          id: 6,
          title: "Mahzooz Saturday Draw",
          date: "04 November 2023",
          videoId: "video6",
          thumbnail: "/api/placeholder/400/225",
        },
      ];

      setVideos(mockData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(videos.length / videosPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Section
          className="pt-[6rem] -mt-[5.25rem]"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
          id="hero"
        >
          <div className="container mx-auto px-4 py-8">
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent">
                  Loading...
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-semibold text-center mb-14">
                  Past Drawings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-14">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <div className="relative pb-[56.25%]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {video.title}
                        </h3>
                        <p className="text-gray-600">{video.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  );
};

export default PastDrawings;
