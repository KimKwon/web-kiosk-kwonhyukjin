const ERROR_MSG = {
  400: '요청에 문제가 있었어요.',
  404: '원하는 데이터를 찾지 못했어요.',
  500: '서버에서 내부적인 문제가 생겼어요.',
  502: '게이트웨이에 문제가 생겼어요.',
} as const;

export default ERROR_MSG;
