import { dataUpdateState } from '@/recoil/atoms';
import { theme } from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

const ArtworkHeader = ({ initialCheck, control }
  : { initialCheck: number; control: (isEditing: number) => void }) => {
  const [isChecked, setIsChecked] = useState(initialCheck);
  const [moveChecked, setMoveChecked]=useState<boolean>(false);
  const isUpdate=useRecoilValue(dataUpdateState);//sequence 변경 있는지 확인
  const setupdate = useSetRecoilState(dataUpdateState);
  useEffect(() => {
    //초기값 변경될 때 상태 업데이트
    console.log(initialCheck)
    setIsChecked(initialCheck);
  }, [initialCheck]);

  return (
    <HeaderWrapper onClick={()=>{
      if(isUpdate){
        if(window.confirm("현재 페이지를 나가면 변경 사항이 저장되지 않습니다.\n나가시겠습니까?")){
          setMoveChecked(false)
          setupdate(false)
        }else{
          setMoveChecked(true)
          setupdate(true)
        }
      }}}>
      <div className='tabs'>
        <input type='radio' id='radio1' name='tabs' onClick={() => {control(0)}} defaultChecked={isChecked === 0} 
        disabled={moveChecked}/>
        <label className='tab' htmlFor='radio1'>
          아트워크 관리
        </label>
        <input type='radio' id='radio2' name='tabs' onClick={() => {control(1)}} defaultChecked={isChecked === 1} 
        disabled={moveChecked}/>
        <label className='tab' htmlFor='radio2'>
          메인 순서 관리
        </label>
        <input type='radio' id='radio3' name='tabs' onClick={() => {control(2)}} defaultChecked={isChecked === 2} 
        disabled={moveChecked}/>
        <label className='tab' htmlFor='radio3'>
          전체 순서 관리
        </label>
        <span className='glider'></span>
      </div>
    </HeaderWrapper>
  );
};

export default ArtworkHeader;

const HeaderWrapper = styled.div`
  font-family: 'pretendard-bold';
  // font-size: 32px;
  color: #595959;
  margin-bottom: 21px;

  .tabs {
    width: 450px;
    display: flex;
    flex-direction: row;
    // position: relative;
    background-color: #fff;
    border-radius: 99px; // just a high number to create pill effect
    * {
      z-index: 2;
    }
  }

  input[type='radio'] {
    display: none;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 150px;
    font-size: 1.2rem;
    border-radius: 99px; // just a high number to create pill effect
    cursor: pointer;
    transition: color 0.15s ease-in;
  }

  input[type='radio'] {
    &:checked {
      & + label {
        color: ${theme.color.yellow.bold};
      }
    }
  }

  input[id='radio1'] {
    &:checked {
      & ~ .glider {
        transform: translateX(0);
      }
    }
  }
  input[id='radio2'] {
    &:checked {
      & ~ .glider {
        transform: translateX(100%);
      }
    }
  }
  input[id='radio3'] {
    &:checked {
      & ~ .glider {
        transform: translateX(200%);
      }
    }
  }

  .glider {
    position: absolute;
    display: flex;
    height: 50px;
    width: 150px;
    background-color: ${theme.color.yellow.light};
    z-index: 1;
    border-radius: 99px;
    transition: 0.25s ease-out;
  }
`;
