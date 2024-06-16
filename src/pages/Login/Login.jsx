import React from "react";
import { useNavigate } from "react-router-dom";
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

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/dashboard");
    }
  });

  return (
    <div className="grid h-3/4 grid-cols-1 justify-items-center pt-24">
      <h1 className="scale-150 text-xl font-extrabold">
        My, My, What sense you have to choose Whatcents!
      </h1>
      <h4 className="scale-150 text-sm font-semibold">
        Let's get you signed in, then we can help you keep your remaining cents
        after payday.
      </h4>
      <div className="flex h-full w-1/4 flex-col items-center justify-center space-y-4 rounded-l-xl rounded-r-xl bg-gray-900 p-4 outline outline-1 outline-offset-0 outline-gray-700">
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: customTheme }}
          theme="dark"
          providers={["google"]}
        />
      </div>
    </div>
  );
};
