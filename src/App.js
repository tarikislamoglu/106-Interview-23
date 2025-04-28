import { useState } from "react";

function App() {
  const buttonClass = "border-1 cursor-pointer bg-gray-100";
  return (
    <div className="flex  h-[100vh] justify-center items-center ">
      <FeedbackWrapper
        onSubmit={(obj) => {
          alert(`Modal derecelendirme: ${obj}`);
        }}
      >
        <div className="flex mb-2">
          <button className={`p-1 ${buttonClass}`}>Bir button</button>
          <button className={`p-1 ${buttonClass}`}>Başka bir button</button>
        </div>
        <button className={`p-4 ${buttonClass}`}>Büyük bir button</button>
      </FeedbackWrapper>
    </div>
  );
}

const FeedbackWrapper = ({ onSubmit, children }) => {
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(3);

  const ratingStatus = (rating) => {
    switch (parseInt(rating)) {
      case 1:
        return "Memnun değil";
      case 2:
        return "Biraz memnun";
      case 3:
        return "Memnun";
      case 4:
        return "Çok memnun";
      case 5:
        return "Son derece memnun";
      default:
        return "";
    }
  };

  const handleButtonClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3 && !showModal) {
        setShowModal(true);
      }
      return newCount;
    });
  };
  return (
    <div className="relative w-[400px] h-[400px] flex justify-center items-center">
      <div onClick={handleButtonClick}>{children}</div>
      {showModal && (
        <div className=" absolute top-0 left-0 bg-orange-500 w-full h-full flex justify-center items-center flex-col space-y-5 text-white">
          <h3 className="bg-amber-400 w-full p-2 text-center  ">
            Geri bildiriminizi bırakınız
          </h3>
          <div className="flex flex-col  items-center space-y-5 bg-amber-400 py-10 px-5 min-w-2/3 h-1/3">
            {" "}
            <input
              type="range"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              min={1}
              max={5}
              className="cursor-pointer"
            />
            <p>{ratingStatus(rating)}</p>
          </div>

          <button
            className="bg-amber-950 p-2  cursor-pointer"
            onClick={() => {
              onSubmit(ratingStatus(rating));
              setShowModal(false);
              setClickCount(0);
            }}
          >
            Gönder
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
