// HTTP 상태 코드 관련 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "네트워크 에러가 발생했어요! 네트워크 환경을 확인해주세요.",
  BAD_REQUEST: "잘못된 요청입니다! 요청을 다시 확인해주세요.",
  UNAUTHORIZED: "인증에 실패했습니다! 다시 로그인 해주세요.",
  FORBIDDEN: "접근 권한이 없습니다!",
  NOT_FOUND: "요청하신 리소스를 찾을 수 없습니다!",
  SERVER_ERROR: "서버에서 문제가 발생했습니다! 잠시 후 다시 시도해주세요.",
  DEFAULT_ERROR: "알 수 없는 에러가 발생했습니다! 다시 시도해주세요.",
};