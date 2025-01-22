import React, { useState, useEffect } from "react";

const AgeVerification = ({ onVerify }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isVerified = localStorage.getItem("ageVerified");
    if (!isVerified) {
      setOpen(true);
    } else {
      onVerify?.();
    }
  }, [onVerify]);

  const handleVerify = () => {
    localStorage.setItem("ageVerified", "true");
    setOpen(false);
    onVerify?.();
  };

  const handleExit = () => {
    window.location.href = "https://google.com";
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#131313",
          borderRadius: "8px",
          padding: "2rem",
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div className="text-2xl font-bold flex items-center justify-center mb-4  bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-transparent bg-clip-text">
          AGE VERIFICATION
        </div>

        <p
          style={{
            color: "white",
            fontSize: "1.125rem",
            marginBottom: "2rem",
          }}
        >
          You must be 18 years or older to enter this website
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            "@media (min-width: 640px)": {
              flexDirection: "row",
              justifyContent: "center",
            },
          }}
        >
          <button
            onClick={handleVerify}
            style={{
              background: "linear-gradient(to right, #9333ea, #db2777)",
              color: "white",
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1.1rem",
              boxShadow: "0 4px 15px rgba(219, 39, 119, 0.3)",
              ":hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(219, 39, 119, 0.4)",
              },
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(219, 39, 119, 0.4)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(219, 39, 119, 0.3)";
            }}
          >
            I am 18 or older
          </button>
          <button
            onClick={handleExit}
            style={{
              backgroundColor: "transparent",
              color: "white",
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              fontSize: "1.1rem",
              backdropFilter: "blur(5px)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};
export default AgeVerification;
