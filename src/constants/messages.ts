const BUTTON_MSG = {
  SAVE: '저장하기',
  DELETE: '삭제하기',
  MODIFY: '수정하기',
  POST: '등록하기',
  UPLOAD: {
    LOGO: 'Logo Upload',
    SLOGAN: 'Slogan Upload',
  },
  ADD: {
    DETAIL: 'Add New Detail',
    PARTNER: 'Add New Partner',
    CLIENT: 'Add New Client',
  },
};

const CONFIRM_MSG = {
  SAVE: '저장하시겠습니까?',
  DELETE: '삭제하시겠습니까?',
  POST: '등록하시겠습니까?',
  CANCLE: '취소하시겠습니까?',
  EXIT: '현재 페이지를 나가면 변경사항이 저장되지 않습니다.\n나가시겠습니까?',
  DATA_EDIT: {
    EXIT: '이전 요소의 변경사항이 저장되지 않습니다.\n계속하시겠습니까?',
  },
  LOGIN_SUCCESS: '로그인에 성공하였습니다.',
  LOGIN_FAIL: '로그인에 실패하였습니다.\n문제가 지속될 경우 관리자에게 문의해 주세요.',
  LOGIN_NOTAPPROVED: '승인되지 않은 계정입니다. \n스튜디오 아이 계정 관리자에게 문의해 주세요.',
  FAILED: '작업에 실패했습니다. 다시 시도해 주세요. \n문제가 지속될 경우 관리자에게 문의해 주세요.',
};

const ALERT_MSG = {
  SAVE: '저장되었습니다.',
  DELETE: '삭제되었습니다.',
  POST: '등록되었습니다.',
};

const PLACEHOLDER_MSG = {
  ADDRESS: '주소를 입력해주세요.',
  ENGLISH_ADDRESS: '영문 주소를 입력해주세요.',
  PHONE: '전화번호를 입력해주세요.',
  FAX: '팩스번호를 입력해주세요.',
  DETAIL: {
    TITLE: '제목을 입력해주세요.',
    CONTENT: '내용을 입력해주세요.',
  },
  LINK: '링크를 입력해주세요.',
  NAME: '이름을 입력해주세요.',
};

const INVALID_MSG = {
  ADDRESS: '유효한 주소를 입력해주세요.',
  ENGLISH_ADDRESS: '유효한 영문 주소를 입력해주세요.',
  PHONE: '유효한 전화번호를 입력해주세요. (예: 010-1234-5678) ',
  FAX: '유효한 팩스번호 형식을 입력해주세요. (예: 02-123-4567 또는 031-1234-5678)',
  DETAIL: 'Detail 항목은 최소 1개 이상 등록되어야 합니다.',
  LOGO: 'Logo 파일을 업로드해주세요.',
  SLOGAN: 'Slogan 파일을 업로드해주세요.',
  NAME: '공백만으로는 이름을 입력할 수 없습니다.',
  LINK: {
    HOSTNAME: 'URL에는 도메인 이름이 있어야 합니다. (예: example.com).',
    PROTOCOLS: 'URL은 http:// 또는 https://로 시작해야 합니다.',
    OTHER: '올바른 형식의 URL을 입력해주세요. (예: https://www.example.com)',
  },
  FILE: '파일을 업로드해주세요.',
};

const EXCEPTION_MSG = {
  NULL_DATA: '데이터가 존재하지 않습니다.',
  INVALID_LINK: '유효하지 않은 URL입니다.',
};

export const MSG = {
  BUTTON_MSG,
  ALERT_MSG,
  CONFIRM_MSG,
  PLACEHOLDER_MSG,
  INVALID_MSG,
  EXCEPTION_MSG,
};
