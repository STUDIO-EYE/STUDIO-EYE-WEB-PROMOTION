import ArtworkComponent from '@/components/PromotionAdmin/Artwork/ArtworkDefault/Artwork';
import ArtworkHeader from '@/components/PromotionAdmin/Artwork/ArtworkHeader';
import ArtworkSequence from '@/components/PromotionAdmin/Artwork/ArtworkSequence/ArtworkSequence';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { ArtworkData } from '@/types/PromotionAdmin/artwork';
import { getAllArtworks } from '@/apis/PromotionAdmin/artwork';
import { useLocation, useNavigate } from 'react-router-dom';

const Artwork = () => {
  
  // const [isEditingSequence, setIsEditingSequence] = useState<number>(0); //ArtworkHeader navigate용
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const editingSequenceFromURL = parseInt(queryParams.get('editing') || '0', 10); // URL에서 상태 읽기
  const [isEditingSequence, setIsEditingSequence] = useState<number>(editingSequenceFromURL);
  const handleEditingSequence = (isEditing: number) => {
    setIsEditingSequence(isEditing);
    navigate(`?editing=${isEditing}`);
  };

  const { data, isLoading, error, refetch } = useQuery<ArtworkData[], Error>('artworksequence', getAllArtworks);

  return (
    <Container>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ArtworkHeader initialCheck={isEditingSequence} control={handleEditingSequence} />
      </div>
      {isEditingSequence === 0 ? (
        <ArtworkComponent />
      ) : isEditingSequence === 1 ? (
        <ArtworkSequence type='main' data={data} isLoading={isLoading} error={error} refetch={refetch} />
      ) : (
        <ArtworkSequence type='other' data={data} isLoading={isLoading} error={error} refetch={refetch} />
      )}
    </Container>
  );
};

export default Artwork;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
