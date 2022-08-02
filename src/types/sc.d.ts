import 'styled-components';
import { ColorType } from '../cores/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key in keyof ColorType]: ColorType[key];
    };
  }
}
