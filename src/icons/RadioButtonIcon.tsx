import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const RadioButtonIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 1000 1000"
    fill={props.color}
    {...props}>
    <Path d="M499 291q-56 0-104 28t-76 76-28 104 28 104 76 76 104 28 104-28 76-76 28-104-28-104-76-76-104-28zm0-208q-113 0-210 57-94 55-149 149-57 97-57 210t57 210q55 94 149 149 97 57 210 57t210-57q94-55 149-149 57-97 57-210t-57-210q-55-94-149-149-97-57-210-57zm0 749q-90 0-168-46-75-44-119-119-46-78-46-168t46-168q44-75 119-119 78-46 168-46t168 46q75 44 119 119 46 78 46 168t-46 168q-44 75-119 119-78 46-168 46z" />
  </Svg>
);
export default RadioButtonIcon;
