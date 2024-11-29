import React from 'react';

const Step2 = () => {
  return (
    <div>
      <h3>인적사항을 입력해주세요</h3>
      <input placeholder="성함을 입력해주세요 *" />
      <input placeholder="기관명을 입력해주세요 *" />
      <input placeholder="연락처를 입력해주세요 (010-1234-5678) *" />
      <input placeholder="이메일 주소를 입력해주세요 *" />
      <input placeholder="직책을 입력해주세요" />
    </div>
  );
};

export default Step2;
