import React, { useState, useEffect, useRef } from 'react';
import ArtworkList from './ArtworkList';
import { IArtwork } from '@/types/PromotionPage/artwork';

interface IArtworkSliderProps {
  artworks: IArtwork[];
}

const ArtworkSlider: React.FC<IArtworkSliderProps> = ({ artworks }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    if (!artworks || artworks.length === 0) return;

    const interval = setInterval(() => {
      setTransitioning(true);

      activeIndexRef.current = (activeIndexRef.current + 1) % artworks.length;

      // 0.1초 후 activeIndex 교체 -> 바꿀 준비 완
      setTimeout(() => {
        setActiveIndex(activeIndexRef.current);
        setTransitioning(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [artworks]);

  if (!artworks || artworks.length === 0) {
    return <div>표시할 아트워크가 없습니다.</div>;
  }

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'transform 2s ease',
          transform: transitioning ? 'translateX(-100%)' : 'translateX(0)', // 현재 아트워크 왼쪽으로 나감
        }}
      >
        <ArtworkList
          key={activeIndex}
          data={{
            backgroundImg: artworks[activeIndex].mainImg || '',
            title: artworks[activeIndex].name || '',
            client: artworks[activeIndex].client || '',
            overview: artworks[activeIndex].overView,
            link: artworks[activeIndex].link,
          }}
          count={artworks.length}
          scrollToSection={() => {}}
          elementHeight={window.innerHeight}
          index={activeIndex}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'transform 2s ease',
          transform: transitioning ? 'translateX(0)' : 'translateX(100%)', // 새 아트워크가 오른쪽에서 왼쪽으로 들어옴
        }}
      >
        <ArtworkList
          key={(activeIndex + 1) % artworks.length}
          data={{
            backgroundImg: artworks[(activeIndex + 1) % artworks.length].mainImg || '',
            title: artworks[(activeIndex + 1) % artworks.length].name || '',
            client: artworks[(activeIndex + 1) % artworks.length].client || '',
            overview: artworks[(activeIndex + 1) % artworks.length].overView,
            link: artworks[(activeIndex + 1) % artworks.length].link,
          }}
          count={artworks.length}
          scrollToSection={() => {}}
          elementHeight={window.innerHeight}
          index={(activeIndex + 1) % artworks.length}
        />
      </div>
    </div>
  );
};

export default ArtworkSlider;
