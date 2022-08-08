import { css } from 'styled-components';

interface BackgroundOptions {
  cover?: boolean;
  contain?: boolean;
  repeat?: boolean;
}

const mixin = {
  textEllipsis: (line: number) => css`
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  `,
  concatWonUnit: () => css`
    &::after {
      content: '원';
    }
  `,
  backgroundImage: (url: string, options: BackgroundOptions) => {
    const { contain, cover, repeat } = options;
    const size = contain ? 'contain' : cover ? 'cover' : 'auto';
    return css`
      background-image: url(${url});
      background-repeat: ${repeat ? 'repeat' : 'no-repeat'};
      background-size: ${size};
    `;
  },
};

export default mixin;
