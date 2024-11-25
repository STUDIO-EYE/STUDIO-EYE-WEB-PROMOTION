import React from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';


interface Props {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const RequestSteps: React.FC<Props> = ({ currentStep, onStepChange }) => {
  const handleNext = () => {
    if (currentStep < 3) onStepChange(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) onStepChange(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1 />;
      case 1:
        return <Step2 />;
    //   case 2:
    //     return <Step3 />;
    //   case 3:
    //     return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      <div>
        <button onClick={handlePrev} disabled={currentStep === 0}>
          이전
        </button>
        <button onClick={handleNext} disabled={currentStep >= 3}>
          {currentStep === 2 ? '문의 접수' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default RequestSteps;
