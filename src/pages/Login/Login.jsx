import React from "react";
import {useNavigate} from "react-router-dom";
import supabaseClient from "../../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import {TickerLetter} from "../../components/TickerLetter";

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
      inputLabelText: "#95a5b5",
      inputPlaceholder: "#374151",
      messageText: "gray",
      messageTextDanger: "red",
      anchorTextColor: "#95a5b5",
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
  const START_DELAY = 2000;

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/dashboard");
    }
  });

  return (
      <section className="min-h-screen overflow-hidden flex flex-col justify-center">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center tracking-wider lg:pb-6">
            <h1 className="text-3xl lg:text-7xl font-extrabold lg:mb-4" data-aos="zoom-y-out">
              Keep your
              {" "}
              <TickerLetter original="s" alternate="c" startAfter={START_DELAY} delay={0} />
              en
              <TickerLetter original="s" alternate="t" startAfter={START_DELAY} delay={300} />
              <TickerLetter original="e" alternate="s" startAfter={START_DELAY} delay={600} />
              {" "}
              with
            </h1>
            <span className="text-3xl lg:text-7xl font-extrabold lg:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-200 -mt-2">Whatcents</span>

            <div className="grid lg:grid-cols-3 gap-4 mb-10 lg:mb-0 mt-10 mx-6 text-left justify-center lg:text-xl text-gray-400">
              <div className="border-gray-600 lg:border-r-2">
                <p className="flex-none text-white font-bold">Step 1:</p>
                <p className="text-center lg:text-left">
                  Add all of your monthly expenses</p>
              </div>
              <div className="border-gray-600 lg:border-r-2">
                <p className="flex-none text-white font-bold">Step 2:</p>
                <p className="text-center lg:text-left">
                  Add your average paycheck income</p>
              </div>
              <div>
                <p className="flex-none text-white font-bold">Done!</p>
                <p className="text-center lg:text-left">
                  Whatcents will tell you how much you have left!</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-center">
            <Auth
                supabaseClient={supabaseClient}
                appearance={{ theme: customTheme }}
                theme="dark"
                providers={["google"]}
            />
          </div>
        </div>
      </section>
  );
};
