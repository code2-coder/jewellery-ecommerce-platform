import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMic, FiCamera, FiX, FiUploadCloud } from "react-icons/fi";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [speechText, setSpeechText] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Voice Search Handler (Mock Web Speech API)
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setSpeechText("Listening...");

    // Simulate speech-to-text recognition with key luxury keywords
    const mockKeywords = ["Gold ring", "Diamond earrings", "Mia necklace", "Bespoke bracelet"];
    const randomKeyword = mockKeywords[Math.floor(Math.random() * mockKeywords.length)];

    setTimeout(() => {
      setSpeechText(`" ${randomKeyword} "`);
    }, 1500);

    setTimeout(() => {
      setIsListening(false);
      setKeyword(randomKeyword);
      navigate(`/search/${randomKeyword}`);
    }, 3200);
  };

  // Image Drag & Drop Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedImage(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedImage(e.target.files[0]);
    }
  };

  const processUploadedImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      
      // Simulate high-tech AI image recognition matching jewellery
      setTimeout(() => {
        const mockImageSearchMatches = ["diamond", "rings", "gold"];
        const match = mockImageSearchMatches[Math.floor(Math.random() * mockImageSearchMatches.length)];
        setShowImageModal(false);
        setSelectedImage(null);
        navigate(`/search/${match}`);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative w-full flex justify-center z-45">
      <form onSubmit={submitHandler} className="relative hidden sm:flex items-center group w-full max-w-4xl">
        {/* Left Side: Luxury Brand Color Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none z-10">
          <FiSearch className="text-gray-400 group-hover:text-[#832729] transition-colors duration-300 text-base" />
        </div>

        {/* Improved Input Field - Gold glow on focus, clean borders */}
        <input
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search collections, diamonds, gold..."
          className="block w-full pl-11 pr-24 py-2.5 bg-[#fbf9f4]/80 border border-gray-200/80 rounded-full text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#c5a880] focus:ring-4 focus:ring-[#c5a880]/15 transition-all duration-300 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]"
        />

        {/* Right Side Icons: Audio Search & Image Search inside a neat circular capsule */}
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
          <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-full py-1 px-2.5 shadow-sm">
            {/* Audio Search Button */}
            <button
              type="button"
              onClick={toggleListening}
              title="Search by voice"
              className="text-gray-400 hover:text-[#832729] transition-colors duration-300 p-0.5"
            >
              <FiMic className="text-sm md:text-base hover:scale-110 transition-transform duration-300" />
            </button>

            <span className="h-3 w-[1px] bg-gray-200"></span>

            {/* Image Search Button */}
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              title="Search by image"
              className="text-gray-400 hover:text-[#832729] transition-colors duration-300 p-0.5"
            >
              <FiCamera className="text-sm md:text-base hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <button type="submit" className="hidden">Submit</button>
      </form>

      {/* Voice Search active overlay */}
      {isListening && (
        <div className="fixed inset-0 bg-[#1c1c1c]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
          <div className="relative flex items-center justify-center mb-8">
            {/* Pulsing Micro-Animations */}
            <div className="absolute w-28 h-28 bg-[#832729]/30 rounded-full animate-ping"></div>
            <div className="absolute w-20 h-20 bg-[#832729]/50 rounded-full animate-pulse"></div>
            <div className="relative w-16 h-16 bg-[#832729] rounded-full flex items-center justify-center shadow-lg border-2 border-[#c5a880]/30">
              <FiMic className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="font-serif text-xl tracking-wider mb-2 text-[#c5a880]">Voice Search Active</h2>
          <p className="text-sm font-sans tracking-wide text-white/80 min-h-[24px]">
            {speechText}
          </p>
          <button
            onClick={() => setIsListening(false)}
            className="mt-12 bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <FiX /> Cancel
          </button>
        </div>
      )}

      {/* Image Search Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-[#1c1c1c]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-100 relative">
            <button
              type="button"
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#832729] p-1.5 rounded-full hover:bg-gray-50 transition-colors z-30"
            >
              <FiX className="text-lg" />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="font-serif text-2xl text-gray-800 mb-1">Visual Search</h3>
                <p className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">Find matches by uploading an image</p>
              </div>

              {!selectedImage ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                  className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
                    dragActive
                      ? "border-[#832729] bg-[#832729]/5"
                      : "border-gray-300 hover:border-[#c5a880] hover:bg-[#fbf9f4]"
                  }`}
                >
                  <FiUploadCloud className="text-4xl text-gray-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-sm text-gray-600 font-medium mb-1">Drag and drop your image here</p>
                  <p className="text-xs text-gray-400">or click to browse local files</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border border-gray-200 p-0.5 bg-gray-50 flex items-center justify-center shadow-md mb-6 animate-pulse">
                    <img src={selectedImage} alt="Preview" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Analyzing Visual Features...</h4>
                  <p className="text-xs text-[#c5a880] uppercase tracking-widest">Searching the Royal Atelier database</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
