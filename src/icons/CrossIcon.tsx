import * as React from 'react';
import Svg, {Ellipse, Path} from 'react-native-svg';
const CrossIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    className="icon multi-color"
    viewBox="0 0 24 24"
    {...props}>
    <Ellipse
      cx={10.5}
      cy={12}
      rx={7.5}
      ry={8.88}
      style={{
        fill: '#037bfc',
        strokeWidth: 2,
      }}
    />
    <Path
      d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Zm-6 3L9 9m0 6 6-6"
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
export default CrossIcon;
