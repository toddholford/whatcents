import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LandingThumbnail from '../../images/whatcents-landing-thumbnail.png';
import Modal from "../../components/Modal/Modal";
import supabaseClient from "../../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const customTheme = {
  default: {
    colors: {
      brand: "#047857",
      brandAccent: "rgb(6 95 70)",
      brandButtonText: "white",
      defaultButtonBackground: "rgba(11,18,33,0.79)",
      defaultButtonBackgroundHover: "rgb(31 41 55)",
      defaultButtonBorder: "#374151",
      defaultButtonText: "white",
      dividerBackground: "#374151",
      inputBackground: "rgba(11,18,33,0.79)",
      inputBorder: "#374151",
      inputBorderHover: "rgb(75 85 99)",
      inputBorderFocus: "white",
      inputText: "white",
      inputLabelText: "#374151",
      inputPlaceholder: "#374151",
      messageText: "gray",
      messageTextDanger: "red",
      anchorTextColor: "#374151",
      anchorTextHoverColor: "white",
    },
    space: {
      spaceSmall: "4px",
      spaceMedium: "8px",
      spaceLarge: "16px",
      labelBottomMargin: "8px",
      anchorBottomMargin: "4px",
      emailInputSpacing: "4px",
      socialAuthSpacing: "4px",
      buttonPadding: "10px 15px",
      inputPadding: "10px 15px",
    },
    fontSizes: {
      baseBodySize: "13px",
      baseInputSize: "14px",
      baseLabelSize: "14px",
      baseButtonSize: "14px",
    },
    fonts: {
      bodyFontFamily: `ui-sans-serif, sans-serif`,
      buttonFontFamily: `ui-sans-serif, sans-serif`,
      inputFontFamily: `ui-sans-serif, sans-serif`,
      labelFontFamily: `ui-sans-serif, sans-serif`,
    },
    // fontWeights: {},
    // lineHeights: {},
    // letterSpacings: {},
    // sizes: {},
    borderWidths: {
      buttonBorderWidth: "1px",
      inputBorderWidth: "1px",
    },
    // borderStyles: {},
    radii: {
      borderRadiusButton: "4px",
      buttonBorderRadius: "4px",
      inputBorderRadius: "4px",
    },
    // shadows: {},
    // zIndices: {},
    // transitions: {},
  },
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    videoModalOpen ? video.current.play() : video.current.pause();
  }, [videoModalOpen]);

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/dashboard");
    }
  });

  return (
      <section className="max-h-screen overflow-hidden">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-12 pb-12 md:pt-12 md:pb-20">
            <div className="text-center tracking-wider pb-6">
              <h1 className="text-7xl font-extrabold mb-4" data-aos="zoom-y-out">
                Keep your sense with <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 to-emerald-400">Whatcents</span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl italic font-extrabold text-gray-400 mb-2" data-aos="zoom-y-out" data-aos-delay="150">
                  No more wasted time on figuring out how much money you have left after monthly expenses.
                </p>
                <p className="text-xl text-gray-400 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                  It's simple, after adding all of your monthly expenses, add your average paycheck income and Whatcents will tell you how much you have left!
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between">
              <div className="relative flex justify-center mb-8" data-aos="zoom-y-out" data-aos-delay="450">
                <div className="flex flex-col justify-center">
                  <img className="mx-auto" src={LandingThumbnail} width="768" height="432" alt="Hero" />
                </div>
                <button
                    className="absolute top-full flex items-center transform -translate-y-1/2 bg-emerald-950 rounded-full font-medium group outline outline-1 outline-offset-0 outline-emerald-700 hover:bg-emerald-900 p-4 shadow-lg"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setVideoModalOpen(true);
                    }}
                    aria-controls="modal"
                >
                  <svg
                      className="w-6 h-6 fill-current text-gray-400 group-hover:text-emerald-500 flex-shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z" />
                    <path d="M10 17l6-5-6-5z" />
                  </svg>
                  <span className="ml-3">Watch the full video (2 min)</span>
                </button>
              </div>
              <Auth
                  supabaseClient={supabaseClient}
                  appearance={{ theme: customTheme }}
                  theme="dark"
                  providers={["google"]}
              />
              </div>

              <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
                <div className="relative pb-9/16">
                  <video ref={video} className="absolute w-full h-full" width="1920" height="1080" loop autoPlay controls>
                    <source src="/videos/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>
  );
};
