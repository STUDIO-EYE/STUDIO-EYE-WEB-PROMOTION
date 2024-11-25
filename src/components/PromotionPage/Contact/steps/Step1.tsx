import React from 'react';

const Step1 = () => {
  const categories = [
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Drama', label: 'Drama' },
    // 나머지 카테고리
  ];

  return (
    <div>
      <h3>문의할 프로젝트 항목을 선택해주세요 *</h3>
      <div>
        {categories.map((category) => (
          <button key={category.value}>{category.label}</button>
        ))}
      </div>
    </div>
  );
};

export default Step1;
