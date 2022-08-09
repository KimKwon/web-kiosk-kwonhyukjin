const colors = {
  primary: '#2ac1bc',
  secondary: '#8dd6c4',
  black01: '#1f1f1f',
  gray01: '#bbbbbb',
  gray02: '#666666',
  gray03: '#f4f4f4',
  background: '#ededed',
  background02: '#f8f8f8',
} as const;

export type ColorType = typeof colors;
export default {
  colors,
};
