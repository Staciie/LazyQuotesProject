import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SignOutIcon = (props) => (
  <Svg
    width={30}
    height={30}
    className="icon multi-color"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M8 12h13m-4 4 4-4-4-4"
      style={{
        fill: 'none',
        stroke: '#037bfc',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
    <Path
      d="M4 3h2v18H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
      style={{
        fill: '#b7b7b7',
        strokeWidth: 2,
      }}
    />
    <Path
      d="M13 8V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-4"
      style={{
        fill: 'none',
        stroke: '#000',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
      }}
    />
  </Svg>
);
export default SignOutIcon;
