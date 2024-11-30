import { putArtworkMainSequence, putArtworkSequence } from '@/apis/PromotionAdmin/artwork';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import styled from 'styled-components';
import ArtworkSequenceBox from './ArtworkSequenceBox';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DResult, DragProvied, DropProvied } from '@/types/PromotionAdmin/react-beautiful-dnd-types';
import { useMutation, useQueryClient } from 'react-query';
import { theme } from '@/styles/theme';
import { useSetRecoilState } from 'recoil';
import { dataUpdateState } from '@/recoil/atoms';
import { MSG } from '@/constants/messages';

interface ArtworkSequenceProps {
  type: string;
  data: ArtworkData[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const ArtworkSequence = ({ type, data, isLoading, error, refetch }: ArtworkSequenceProps) => {
  const queryClient = useQueryClient();
  const editMainSequence = useMutation({
    mutationFn: (sequenceData: any[]) => putArtworkMainSequence(sequenceData),
    onSuccess: () => queryClient.invalidateQueries(['artworksequence']),
  });
  const editSequence = useMutation({
    mutationFn: (sequenceData: any[]) => putArtworkSequence(sequenceData), 
    onSuccess: () => queryClient.invalidateQueries(['artworksequence']),
  });
  const [realData, setRealData] = useState<ArtworkData[]>([]);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const setupdate = useSetRecoilState(dataUpdateState);

  /**
   * isUpdating: navigation 이동시 데이터 변경 감지용, 변경사항 여부
   * onEdit: 편집모드 여부
   */

  useEffect(() => {
    handleDataSort();
    setOnEdit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type,data]);
  useEffect(() => {
    onEdit ? setupdate(true) : setupdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onEdit]);

  const handleDataSort = () => {
    if (type === 'main') {
      setRealData(
        data
          ? data
              .filter((i) => i.projectType === 'main')
              .sort((a: ArtworkData, b: ArtworkData) => a.mainSequence - b.mainSequence)
          : [],
      );
    } else {
      setRealData(data ? data.sort((a, b) => a.sequence - b.sequence) : []);
    }
  };

  if (isLoading) return <LoadingWrapper>Loading...</LoadingWrapper>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSequence = () => {
    if (window.confirm(MSG.ALERT_MSG.SAVE)) {
      if (type === 'main') {
        const sequenceData = realData.map((i) => {
          return Object.fromEntries([
            ['projectId', i.id],
            ['mainSequence', i.mainSequence],
          ]);
        });
        // console.log(realData)
        editMainSequence.mutate(sequenceData);
      } else {
        const sequenceData = realData.map((i) => {
          return Object.fromEntries([
            ['projectId', i.id],
            ['sequence', i.sequence],
          ]);
        });
        // console.log(sequenceData)
        editSequence.mutate(sequenceData);
      }
      setOnEdit(false);
    }
  };
  const handleCancleSequence = () => {
    if (window.confirm(MSG.CONFIRM_MSG.CANCLE)) {
      handleDataSort();
      setOnEdit(false);
    }
  };

  const onDragEnd = ({ draggableId, destination, source }: DResult) => {
    if (!destination) return;
    setupdate(true);
    setRealData((oldData) => {
      const copyData = [...oldData];
      copyData.splice(source.index, 1);
      if (type === 'main') {
        copyData.splice(destination?.index, 0, { ...realData[source.index], mainSequence: destination.index + 1 });
        return copyData.map((data, index) => {
          return { ...data, mainSequence: index + 1 };
        });
      } else {
        copyData.splice(destination?.index, 0, { ...realData[source.index], sequence: destination.index + 1 });
        return copyData.map((data, index) => {
          return { ...data, sequence: index + 1 };
        });
      }
    });
  };

  return (
    <div>
      {onEdit ? (
        <>
          <SendButton
            onClick={() => {
              handleCancleSequence();
            }}
          >
            취소
          </SendButton>
          <SendButton
            onClick={() => {
              handleSequence();
            }}
          >
            완료
          </SendButton>
        </>
      ) : (
        <SendButton
          onClick={() => {
            setOnEdit(true);
          }}
        >
          편집
        </SendButton>
      )}

      {data?.length === 0 ? (
        <NoDataWrapper>😊 아트워크 데이터가 존재하지 않습니다.</NoDataWrapper>
      ) : onEdit ? (
        <DragDropContext onDragEnd={onDragEnd}>
          {type === 'main' //main sequence면 top 고정
            ? data
                ?.filter((i) => i.projectType === 'top')
                .map((i) => (
                  <div style={{ marginBottom: '3px' }}>
                    <ArtworkSequenceBox type={'top'} artworkData={i} />
                    <HorizonLine />
                  </div>
                ))
            : null}
          <Droppable droppableId='one'>
            {(provided: DropProvied) => (
              <div ref={provided.innerRef} {...provided.droppableProps} data-cy='PA_droppable_container'>
                {realData.map((data, index) => (
                  <div style={{ marginBottom: '3px' }}>
                    <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                      {(provided: DragProvied) => (
                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} data-cy={`PA_draggable_item_${index}`}>
                          <ArtworkSequenceBox type={type === 'main' ? 'main' : 'other'} artworkData={data} />
                        </div>
                      )}
                    </Draggable>
                    {provided.placehodler}
                  </div>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div>
          {/*edit 모드 아니면 일반 리스트*/}
          {type === 'main' //main sequence면 top 고정
            ? data
                ?.filter((i) => i.projectType === 'top')
                .map((i) => (
                  <div style={{ marginBottom: '3px' }}>
                    <ArtworkSequenceBox type={'top'} artworkData={i} />
                    <HorizonLine />
                  </div>
                ))
            : null}
          {realData.map((data) => (
            <div style={{ marginBottom: '3px' }}>
              <ArtworkSequenceBox type={type === 'main' ? 'main' : 'other'} artworkData={data} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ArtworkSequence;

const LoadingWrapper = styled.div`
  font-family: 'pretendard-regular';
  font-size: 17px;
`;

const NoDataWrapper = styled.div`
  font-family: 'pretendard-medium';
  font-size: 17px;
`;

const SendButton = styled.button`
  border-radius: 5px;
  width: fit-content;
  font-family: 'pretendard-semibold';
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  margin-bottom: 1rem;
  margin-right: 1rem;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #5a6268;
  }
`;

const HorizonLine = styled.div`
  width: 100%;
  height: 1.5px;
  background-color: ${theme.color.black.pale};
  margin: 0.5rem 0;
`;
