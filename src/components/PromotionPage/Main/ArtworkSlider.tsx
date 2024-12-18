import React, { useState, useEffect, useRef } from 'react';
import ArtworkList from './ArtworkList';
import { IArtwork } from '@/types/PromotionPage/artwork';
import { ARTWORKLIST_DATA } from '@/constants/introdutionConstants';
import defaultMainImg from '@/assets/images/PP/defaultMainImg.jpg';

interface IArtworkSliderProps {
  artworks: IArtwork[];
}

const ArtworkSlider: React.FC<IArtworkSliderProps> = ({ artworks }) => {
  const [activeIndex, setActiveIndex] = useState(1); // 중간에서 시작
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // 앞뒤로 복사된 배열 생성
  const extendedArtworks = [
    artworks[artworks.length - 1], // 마지막 이미지 복사
    ...artworks,
    artworks[0], // 첫 번째 이미지 복사
  ];

  useEffect(() => {
    if (!artworks || artworks.length <= 1) return;

    const interval = setInterval(() => {
      handleSlide(1); // 다음 슬라이드로 이동
    }, 4000);

    return () => clearInterval(interval);
  }, [artworks]);

  const handleSlide = (direction: number) => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setActiveIndex((prevIndex) => prevIndex + direction);
    }, 1000); // 애니메이션 시간과 동기화
  };

useEffect(() => {
  const totalArtworks = artworks.length;

  if (activeIndex === 0) {
    // 첫 번째 복사본에서 실제 마지막 이미지로 이동
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'none'; // 애니메이션 없이 이동
      }
      setActiveIndex(totalArtworks); // 마지막으로 이동
    }, 1000); // 애니메이션 끝날 때까지 대기
  } else if (activeIndex === totalArtworks + 1) {
    // 마지막 복사본에서 실제 첫 번째 이미지로 이동
    setActiveIndex(1); // 첫 번째 인덱스로 이동

    // 애니메이션을 다시 활성화
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition = 'transform 1s ease'; // 애니메이션 다시 활성화
      }
    }, 50); // 아주 짧은 시간 후 애니메이션을 활성화
  } else {
    if (sliderRef.current) {
      sliderRef.current.style.transition = 'transform 1s ease'; // 일반 애니메이션
    }
  }
}, [activeIndex, artworks.length]);

  if (!artworks || artworks.length === 0) {
    return (
      <div data-cy="artworkslider-section" style={{ height: '100vh' }}>
        <ArtworkList
          key={0}
          data={{
            id: ARTWORKLIST_DATA.ID,
            backgroundImg: defaultMainImg,
            title: ARTWORKLIST_DATA.TITLE,
            client: ARTWORKLIST_DATA.CLIENT,
            overview: ARTWORKLIST_DATA.OVERVIEW,
            link: '',
          }}
          count={1}
          scrollToSection={() => {}}
          elementHeight={window.innerHeight}
          index={0}
        />
      </div>
    );
  }

  if (artworks.length === 1) {
    return (
      <div data-cy="artworkslider-section" style={{ height: '100vh' }}>
        <ArtworkList
          key={0}
          data={{
            id: artworks[0].id || 0,
            backgroundImg: artworks[0].mainImg || '',
            title: artworks[0].name || '',
            client: artworks[0].client || '',
            overview: artworks[0].overView,
            link: artworks[0].link,
          }}
          count={1}
          scrollToSection={() => { }}
          elementHeight={window.innerHeight}
          index={0}
        />
      </div>
    );
  }

  return (
    <div
      data-cy="artworkslider-section"
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${-activeIndex * 100}vh)`,
          transition: 'transform 1s ease',
        }}
      >
        {extendedArtworks.map((artwork, index) => (
          <div
            key={index}
            style={{
              minHeight: '100vh',
              width: '100%',
            }}
          >
            <ArtworkList
              key={index}
              data={{
                id: artwork.id || ARTWORKLIST_DATA.ID,
                backgroundImg: artwork.mainImg || defaultMainImg,
                title: artwork.name || ARTWORKLIST_DATA.TITLE,
                client: artwork.client || '',
                overview: artwork.overView,
                link: artwork.link,
              }}
              count={artworks.length}
              scrollToSection={() => {}}
              elementHeight={window.innerHeight}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtworkSlider;
