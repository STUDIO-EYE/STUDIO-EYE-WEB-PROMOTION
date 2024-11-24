import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { theme } from '@/styles/theme';

export const ARTWORK_CATECORY = {
  ALL: 'All',
  ENTERTAINMENT: 'Entertainment',
  DRAMA: 'Drama',
  DOCUMENTARY: 'Documentary',
  CHANNEL_OPERATING: 'Channel Operating',
  BRANDED: 'Branded',
  MOTION_GRAPHIC: 'Motion Graphic',
  ANIMATION: 'Animation',
  LIVE_COMMERCE: 'Live Commerce',
};

export const artwork_categories = [
  { key: 0, label: ARTWORK_CATECORY.ALL },
  { key: 1, label: ARTWORK_CATECORY.ENTERTAINMENT },
  { key: 2, label: ARTWORK_CATECORY.DRAMA },
  { key: 3, label: ARTWORK_CATECORY.DOCUMENTARY },
  { key: 4, label: ARTWORK_CATECORY.CHANNEL_OPERATING },
  { key: 5, label: ARTWORK_CATECORY.BRANDED },
  { key: 6, label: ARTWORK_CATECORY.MOTION_GRAPHIC },
  { key: 7, label: ARTWORK_CATECORY.ANIMATION },
  { key: 8, label: ARTWORK_CATECORY.LIVE_COMMERCE },
];

function Navigation() {
  const navigator = useNavigate();
  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCategoryChange = (categoryKey: string) => {
    categoryKey==='0'?navigator(``):navigator(`?category=${categoryKey}`);
    setSelectedCategory(categoryKey);
    setIsDropdownOpen(false);
  };
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    if (categoryId === null) {
      setSelectedCategory(ARTWORK_CATECORY.ALL);
    }
  }, [categoryId]);

  return (
    <>
      <CategoryBar>
        {artwork_categories.map((category) => (
          <CategoryItem
            key={category.key}
            onClick={() => {
              category.key===0?navigator(``):navigator(`?category=${category.key}`);
              setSelectedCategory(category.label);
            }}
            selected={categoryId === category.key + ''}
          >
            <span>{category.label}</span>
          </CategoryItem>
        ))}
      </CategoryBar>

      <MobileDropdown>
        <DropdownHeader onClick={toggleDropdown}>
          {artwork_categories.find((cat) => cat.key.toString() === selectedCategory)?.label ||
            'All'}
          <ArrowIcon isOpen={isDropdownOpen} />
        </DropdownHeader>
        {isDropdownOpen && (
          <DropdownList>
            {artwork_categories.map((category) => (
              <DropdownItem
                key={category.key}
                onClick={() => handleCategoryChange(category.key.toString())}
              >
                {category.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </MobileDropdown>
    </>
  );
}

export default Navigation;

const CategoryBar = styled.div`
  position: sticky;
  align-self: flex-start;
  top: 80px;
  left: 30px;
  margin-bottom: 80px;
  width: 300px;
  padding-left: 40px;
  color: ${(props) => props.theme.color.black.light};

  @media ${theme.media.mobile} {
    display: none;
  }
`;

const CategoryItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  padding-top: 23px;

  span {
    display: inline-block;
    font-weight: 200;
    font-size: 23px;
    font-family: ${(props) => props.theme.font.light};
    color: ${({ selected }) => (selected ? theme.color.white.bold : theme.color.black.light)};
    border-bottom: 1.5px solid ${({ selected }) => (selected ? theme.color.white.bold : 'none')};
    transition: color 0.3s;
  }

  span:hover {
    color: ${(props) => props.theme.color.white.bold};
  }
`;

const MobileDropdown = styled.div`
  display: none;

  @media ${theme.media.mobile} {
    font-family: 'pretendard-light';
    display: block;
    position: relative;
    width: 20rem;
    max-width: 20rem;
    margin-bottom: 2rem;
    margin-top: -5rem; // 임시
  }
`;

const DropdownHeader = styled.div`
  padding: 0.75rem;
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.black.light};
  border: 1px solid ${(props) => props.theme.color.white.bold};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowIcon = styled.div<{ isOpen: boolean }>`
  width: 1rem;
  height: 1rem;
  background-image: url('data:image/svg+xml;utf8,<svg fill="%23FFF" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s ease;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.color.background};
  border: 1px solid ${(props) => props.theme.color.white.bold};
  z-index: 50;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
`;

const DropdownItem = styled.li`
  color: white;
  padding: 0.5rem 0.75rem;
  background-color: ${(props) => props.theme.color.background};
  color: ${(props) => props.theme.color.black.light};
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.color.black.light};
    color: ${(props) => props.theme.color.white.bold};
  }
`;