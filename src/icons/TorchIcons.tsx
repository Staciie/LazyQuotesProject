import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
export const TorchOffIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="#9BB8CD"
    viewBox="0 -0.5 25 25"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.055 15.721A1.586 1.586 0 0 1 6.5 14.105v-3.232a1.586 1.586 0 0 1 1.555-1.616h5.66c.359 0 .706-.128.98-.36l1.83-1.544a1.55 1.55 0 0 1 2.534 1.255v7.762a1.55 1.55 0 0 1-2.534 1.255l-1.83-1.543a1.518 1.518 0 0 0-.98-.36h-5.66Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M13.618 12.49v3.231"
    />
  </Svg>
);

export const TorchOnIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="#FFE7C1"
    viewBox="0 -0.5 25 25"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.055 15.721A1.586 1.586 0 0 1 3.5 14.105v-3.232a1.586 1.586 0 0 1 1.555-1.616h5.66c.359 0 .706-.128.98-.36l1.83-1.544a1.55 1.55 0 0 1 2.534 1.255v7.762a1.55 1.55 0 0 1-2.534 1.255l-1.83-1.543a1.518 1.518 0 0 0-.98-.36h-5.66Z"
      clipRule="evenodd"
    />
    <Path
      fill="#E7B10A"
      d="M11.368 12.49a.75.75 0 1 0-1.5 0h1.5Zm-1.5 3.231a.75.75 0 0 0 1.5 0h-1.5Zm11.278-7.464a.75.75 0 0 0-.855-1.232l.855 1.232Zm-3.183.384a.75.75 0 0 0 .856 1.232l-.855-1.232ZM21.5 13.24a.75.75 0 0 0 0-1.5v1.5Zm-2.332-1.5a.75.75 0 1 0 0 1.5v-1.5Zm1.128 6.215a.75.75 0 0 0 .855-1.233l-.855 1.233Zm-1.477-2.85a.75.75 0 0 0-.855 1.234l.855-1.233Zm-8.95-2.615v3.232h1.5V12.49h-1.5ZM20.29 7.025l-2.328 1.616.856 1.232 2.327-1.616-.855-1.232Zm1.21 4.714h-2.333v1.5H21.5v-1.5Zm-.35 4.982-2.332-1.616-.855 1.233 2.332 1.616.855-1.233Z"
    />
  </Svg>
);
