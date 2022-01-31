import "./styles/global.css";
import Input from "@zincui/input";
import Box from "@zincui/box";
import { useEffect, useState } from "react";
import { parseToHex, hexToRGB, hexToHSL } from "../../dist/index";
import Documentation from "./components/documentation.mdx";
import randomColor from "./lib/random-color";

const defaultHex = "#18181b";

export const App = () => {
  const [value, setValue] = useState(defaultHex);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        setValue(randomColor());
      }
    };

    document.addEventListener("keypress", listener);

    return () => {
      document.removeEventListener("keypress", listener);
    };
  }, []);

  useEffect(() => {
    try {
      document.body.style.backgroundColor = "#" + parseToHex(value);
    } catch (err) {
      document.body.style.backgroundColor = "#" + parseToHex(defaultHex);
    }
  }, [value]);

  let asHex = "";
  let asRGB = "";
  let asHSL = "";
  try {
    asHex = parseToHex(value);
    asRGB = hexToRGB(asHex);
    asHSL = hexToHSL(asHex);
  } catch (err) {
    asHex = parseToHex(defaultHex);
    asRGB = hexToRGB(asHex);
    asHSL = hexToHSL(asHex);
  }

  return (
    <>
      <Box
        flex
        column
        center
        padding-8
        style={{
          backgroundColor: "var(--base)",
          borderRadius: 10,
          width: "100%",
        }}
      >
        <h1>tocolor</h1>
        <a className="text-dim" href="https://github.com/barelyhuman/tocolor">
          GitHub
        </a>
      </Box>
      <Box
        style={{
          flex: 1,
          display: "flex",
          marginTop: "33%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box style={{ width: "100%" }}>
          <Input
            paddingX-26
            autoFocus
            large
            placeholder="Enter a color value in hex, rgb, hsl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
            }}
          />

          <Box margin-12>
            <Box
              flex
              justBetween
              flex-1
              padding-8
              style={{
                backgroundColor: "var(--zinc-800)",
                borderRadius: 10,
                width: "100%",
              }}
            >
              <Box margin-8>
                <span className="text-dim kbd">Space</span>Random Color
              </Box>
              <Box margin-8>
                <span className="text-dim">HEX:</span> #{asHex.toUpperCase()}
              </Box>
              <Box margin-8>
                <span className="text-dim">RGB:</span>{" "}
                {`(${asRGB.r},${asRGB.g},${asRGB.b})`}
              </Box>
              <Box margin-8>
                <span className="text-dim">HSL:</span>{" "}
                {`(${asHSL.h},${asHSL.s},${asHSL.l})`}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        marginT-100
        padding-8
        paddingX-24
        style={{
          borderRadius: 10,
          backgroundColor: "var(--zinc-800)",
        }}
      >
        <Documentation />
      </Box>
    </>
  );
};
