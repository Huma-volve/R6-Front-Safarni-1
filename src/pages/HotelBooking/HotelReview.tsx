import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SearchIcon from "@mui/icons-material/Search";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import hotelImage from "../../assets/images/hotel3.jpg";
import person from "../../assets/images/person1.jpg";
import {
  fetchRoomDetails,
  fetchRoomsAvailability,
  fetchReviews,
  submitReview,
  bookRoom,
  formatDate,
  calculateNights,
  calculateTotalPrice,
  getGalleryImages,
} from "../../types/HotelTypes/HotelTypes";

import type {
  Room,
  Review,
  Booking,
  GalleryImage,
} from "../../types/HotelTypes/HotelTypes";

const HotelDetailsApp = () => {
  const params = useParams<{ id: string }>();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState("About");
  const [isReadMore, setIsReadMore] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [checkIn, setCheckIn] = useState("4 Oct");
  const [checkOut, setCheckOut] = useState("3 Nov");
  const [nights, setNights] = useState(30);
  const [noteToOwner, setNoteToOwner] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const galleryImages: GalleryImage[] = getGalleryImages();

  // تأثيرات لجلب البيانات
  useEffect(() => {
    if (params.id) {
      loadRoomsAvailability();
    }
  }, [params.id]);

  useEffect(() => {
    if (selectedRoom) {
      loadReviews();
    }
  }, [selectedRoom]);

  // دوال جلب البيانات
  const loadRoomDetails = async (id: number) => {
    try {
      setLoading(true);
      const roomDetails = await fetchRoomDetails(id);
      setSelectedRoom(roomDetails);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching room details:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadRoomsAvailability = async () => {
    try {
      if (!params.id) return;

      const roomsData = await fetchRoomsAvailability(params.id);
      setRooms(roomsData);

      // إذا كان هناك غرف، نختار أول غرفة افتراضياً
      if (roomsData.length > 0 && !selectedRoom) {
        loadRoomDetails(roomsData[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching rooms:", err);
    }
  };

  const loadReviews = async () => {
    if (!selectedRoom) return;

    try {
      const reviewsData = await fetchReviews(selectedRoom.id);
      setReviews(reviewsData);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  // دوال المراجعات
  const openReviewModal = () => setReviewModalOpen(true);
  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setReviewText("");
    setReviewRating(5);
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || !reviewRating || !selectedRoom) {
      alert("Please add a rating and review text.");
      return;
    }

    try {
      const result = await submitReview(
        selectedRoom.id,
        reviewRating,
        reviewText,
        reviewImage
      );

      if (result.success) {
        const newReview: Review = {
          id: result.data.id,
          user: {
            name: "Current User",
            image: person,
          },
          rating: reviewRating,
          review_text: reviewText,
          created_at: new Date().toISOString(),
        };
        setReviews([newReview, ...reviews]);
        closeReviewModal();
      } else {
        alert(result.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong.");
    }
  };

  // دوال الحجز
  const openBookingModal = () => setBookingModalOpen(true);
  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setNoteToOwner("");
  };

  const openBookingDetails = () => {
    setBookingModalOpen(false);
    setBookingDetailsOpen(true);
  };

  const closeBookingDetails = () => setBookingDetailsOpen(false);

  const handleBooking = async () => {
    if (!selectedRoom) return;

    const bookingData: Booking = {
      room_id: selectedRoom.id,
      check_in_date: formatDate(checkIn),
      check_out_date: formatDate(checkOut),
      adults_count: adults,
      children_count: children,
      infants_count: infants,
      note_to_owner: noteToOwner || undefined,
    };

    try {
      await bookRoom(bookingData);
      alert("Booking confirmed!");
      closeBookingDetails();
    } catch (error) {
      console.error("Error booking:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleCheckInChange = (date: string) => {
    setCheckIn(date);
    setNights(calculateNights(date, checkOut));
  };

  const handleCheckOutChange = (date: string) => {
    setCheckOut(date);
    setNights(calculateNights(checkIn, date));
  };

  // دوال التحكم بالصور
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  // دوال زيادة/نقصان العدادات
  const incrementCounter = (type: "adults" | "children" | "infants") => {
    switch (type) {
      case "adults":
        setAdults((prev) => prev + 1);
        break;
      case "children":
        setChildren((prev) => prev + 1);
        break;
      case "infants":
        setInfants((prev) => prev + 1);
        break;
    }
  };

  const decrementCounter = (type: "adults" | "children" | "infants") => {
    switch (type) {
      case "adults":
        setAdults((prev) => Math.max(1, prev - 1));
        break;
      case "children":
        setChildren((prev) => Math.max(0, prev - 1));
        break;
      case "infants":
        setInfants((prev) => Math.max(0, prev - 1));
        break;
    }
  };

  // دوال العرض
  const clickMore = () => setIsReadMore(!isReadMore);

  const filteredReviews = reviews.filter(
    (review) =>
      (review.user.name?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (review.review_text?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  🛏️
                </div>
                <span className="text-black">
                  Capacity: {selectedRoom?.capacity}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  🚿
                </div>
                <span className="text-black">
                  {selectedRoom?.bathroom_number} Bath
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  📐
                </div>
                <span className="text-black">{selectedRoom?.area} Sqft</span>
              </div>
            </div>

            <div>
              <div className="flex items-center text-black justify-between mb-4">
                <h3 className="text-lg font-semibold">Gallery (200)</h3>
                <button
                  className="flex items-center text-[#1E429F] font-medium hover:text-blue-700"
                  onClick={() =>
                    alert(
                      "Photo upload functionality would be implemented here"
                    )
                  }
                >
                  <CameraAltIcon className="w-4 h-4 mr-1" />
                  add Photo
                </button>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {selectedRoom?.description}
                <button
                  onClick={clickMore}
                  className="text-[#1E429F] font-medium ml-1 hover:text-blue-700"
                >
                  {isReadMore ? " Read more" : " Show less"}
                </button>
              </p>
            </div>
          </div>
        );

      case "Gallery":
        return (
          <div className="space-y-6 text-black">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Gallery <span className="text-[#1E429F]">(200)</span>
              </h3>
              <button
                className="flex items-center text-[#1E429F] font-medium hover:text-blue-700"
                onClick={() =>
                  alert("Photo upload functionality would be implemented here")
                }
              >
                <CameraAltIcon className="w-4 h-4 mr-1" />
                add Photo
              </button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-4 gap-3">
                {galleryImages
                  .slice(currentImageIndex, currentImageIndex + 8)
                  .map((img) => (
                    <div
                      key={img.id}
                      className="aspect-square rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => alert(`Viewing image: ${img.alt}`)}
                    >
                      <img
                        src={selectedRoom?.image || hotelImage}
                        alt={img.alt}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </div>
                  ))}
              </div>

              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
                onClick={prevImage}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50"
                onClick={nextImage}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        );

      case "Review":
        return (
          <div className="space-y-6 text-black">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Review ({selectedRoom?.total_reviews || reviews.length})
              </h3>
              <button
                onClick={openReviewModal}
                className="flex items-center text-[#1E429F] font-medium hover:text-blue-700"
              >
                ✏️ add review
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <SearchIcon className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="space-y-4 max-h-44 overflow-y-auto">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <img
                        src={review.user.image || person}
                        alt="Person"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-black">
                          {review.user.name}
                        </h4>
                        <span className="text-sm text-black">
                          {new Date(review.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.review_text}
                  </p>
                </div>
              ))}

              {filteredReviews.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No reviews found matching your search.
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderReviewModal = () => (
    <div className="p-6 space-y-4">
      <hr className="border-gray-200" />
      <div className="flex items-center justify-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="focus:outline-none"
            onClick={() => setReviewRating(star)}
          >
            <StarIcon
              className={`w-6 h-6 ${
                star <= reviewRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add detailed review
        </label>
        <textarea
          rows={4}
          placeholder="Enter here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
      </div>

      <label className="flex items-center text-[#1E429F] font-medium mb-4 hover:text-blue-700 cursor-pointer">
        <CameraAltIcon className="w-4 h-4 mr-1" />
        Add Photo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setReviewImage(e.target.files?.[0] || null)}
        />
      </label>

      <div className="flex space-x-3">
        <button
          onClick={closeReviewModal}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitReview}
          className="flex-1 bg-[#1E429F] text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );

  const renderBookingModal = () => (
    <div className="p-6 space-y-6">
      {/* Check In/Out */}
      <div>
        <h4 className="font-medium mb-3">Check In</h4>
        <div className="grid grid-cols-4 gap-2">
          {["4 Oct", "6 Oct", "7 Oct", "8 Oct"].map((date, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500">
                {index === 0 ? "Today" : ["Tue", "Wed", "Thu", "Fri"][index]}
              </div>
              <button
                onClick={() => handleCheckInChange(date)}
                className={`w-full rounded px-3 py-4 text-sm mt-2 transition-colors ${
                  checkIn === date
                    ? "bg-[#1E429F] border border-[#1E429F] text-white"
                    : "border border-gray-400 hover:border-blue-300"
                }`}
              >
                {date}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Check Out</h4>
        <div className="grid grid-cols-4 gap-2">
          {["3 Nov", "4 Nov", "5 Nov", "6 Nov"].map((date, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500">
                {["Sun", "Mon", "Tue", "Wed"][index]}
              </div>
              <button
                onClick={() => handleCheckOutChange(date)}
                className={`w-full rounded px-3 py-4 text-sm mt-2 transition-colors ${
                  checkOut === date
                    ? "bg-[#1E429F] border border-[#1E429F] text-white"
                    : "border border-gray-400 hover:border-blue-300"
                }`}
              >
                {date}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Note To Owner
        </label>
        <textarea
          rows={3}
          placeholder="Enter here"
          value={noteToOwner}
          onChange={(e) => setNoteToOwner(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
        />
      </div>

      <div className="flex space-x-3">
        <button
          onClick={closeBookingModal}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          className="flex-1 bg-[#1E429F] text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          onClick={openBookingDetails}
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderBookingDetails = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Adults</div>
          <div className="text-sm text-gray-500">Ages 18 Or Above</div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => decrementCounter("adults")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <RemoveIcon className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{adults}</span>
          <button
            onClick={() => incrementCounter("adults")}
            className="w-8 h-8 rounded-full bg-[#1E429F] text-white flex items-center justify-center hover:bg-blue-700"
          >
            <AddIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Children</div>
          <div className="text-sm text-gray-500">Ages 2-17</div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => decrementCounter("children")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <RemoveIcon className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{children}</span>
          <button
            onClick={() => incrementCounter("children")}
            className="w-8 h-8 rounded-full bg-[#1E429F] text-white flex items-center justify-center hover:bg-blue-700"
          >
            <AddIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Infants</div>
          <div className="text-sm text-gray-500">Under Ages 2</div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => decrementCounter("infants")}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
          >
            <RemoveIcon className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{infants}</span>
          <button
            onClick={() => incrementCounter("infants")}
            className="w-8 h-8 rounded-full bg-[#1E429F] text-white flex items-center justify-center hover:bg-blue-700"
          >
            <AddIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Duration: {nights} nights</span>
          <span>${selectedRoom?.price}/night</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span className="text-[#1E429F]">
            ${calculateTotalPrice(selectedRoom?.price || "150", nights)}
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={closeBookingDetails}
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={handleBooking}
          className="flex-1 bg-[#1E429F] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );

  const renderTabs = () => (
    <div>
      <div className="border-b border-gray-200 mb-5">
        <nav className="flex space-x-8">
          {["About", "Gallery", "Review"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 focus:outline-none focus:border-none font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : " text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      {renderTabContent()}
    </div>
  );

  const renderAvailableRooms = () => (
    <div>
      <div className="flex justify-between items-center mb-6 mt-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900">Available Rooms</h2>
        <button className="text-[#1E429F] font-medium border-0 hover:text-[#1E429F]">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((roomItem) => (
          <div
            key={roomItem.id}
            onClick={() => loadRoomDetails(roomItem.id)}
            className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer ${
              selectedRoom?.id === roomItem.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <div className="h-48 bg-gradient-to-br flex items-center justify-center">
              <img
                src={hotelImage}
                alt={`Room ${roomItem.id}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                {`Room #${roomItem.id}`}
              </h3>
              <div className="text-sm text-gray-600">
                From{" "}
                <span className="text-blue-600 font-bold">
                  {roomItem.price}$
                </span>{" "}
                Per Night
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // حالات التحميل والأخطاء
  if (loading && !selectedRoom) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  if (error || !selectedRoom) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">
            Error loading room details: {error || "Room not found"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // التصيير الرئيسي
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Hotel Image */}
          <div className="image relative">
            <img
              src={selectedRoom.image || hotelImage}
              alt="Room"
              className="w-[100%] h-full rounded-xl object-cover"
            />
            <div className="flex space-x-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-2xl cursor-pointer"
                >
                  <img
                    src={selectedRoom.image || hotelImage}
                    alt=""
                    className="rounded-lg"
                  />
                </div>
              ))}
              <div className="relative w-16 h-16 bg-gray-500 rounded-lg flex items-center justify-center text-white font-semibold cursor-pointer">
                <img
                  src={selectedRoom.image || hotelImage}
                  alt=""
                  className="w-full h-full object-cover rounded-lg opacity-50"
                />
                <span className="absolute bg-opacity-50 w-full h-full top-0 left-0 flex items-center justify-center rounded-lg">
                  +99
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Hotel Details */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center justify-between space-x-2 mb-2">
                  {selectedRoom.discount && (
                    <span className="bg-[#EBF5FF] text-[#1E429F] px-2 py-1 rounded text-xs font-semibold">
                      {selectedRoom.discount}
                    </span>
                  )}
                  <div className="flex items-center justify-between space-x-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-black font-semibold">
                      {selectedRoom.average_rating || 0}
                    </span>
                    <span className="text-sm text-gray-500 font-semibold">
                      ({selectedRoom.total_reviews || 0} Reviews)
                    </span>
                  </div>
                </div>
                <h3 className="text-3xl font-medium text-gray-900 mb-1 mt-2">
                  Room #{selectedRoom.id}
                </h3>
                <p className="text-gray-600 text-sm">
                  {selectedRoom.area} Sqft • Capacity: {selectedRoom.capacity} •{" "}
                  {selectedRoom.bathroom_number} Bathrooms
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              {reviewModalOpen
                ? renderReviewModal()
                : bookingModalOpen
                ? renderBookingModal()
                : bookingDetailsOpen
                ? renderBookingDetails()
                : renderTabs()}
            </div>

            {!reviewModalOpen && !bookingModalOpen && !bookingDetailsOpen && (
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">Total price :</span>
                  <span className="text-2xl font-bold text-[#1E429F]">
                    ${selectedRoom.price}
                  </span>
                  <span className="text-gray-500">/night</span>
                </div>

                <button
                  onClick={openBookingModal}
                  className="w-full bg-[#1E429F] text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
        <hr className="my-12 border-gray-200" />
        {renderAvailableRooms()}
      </div>
    </div>
  );
};

export default HotelDetailsApp;
