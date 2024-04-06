import React, { useEffect, useState } from "react";
import Body from "../../components/Common/Body";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import styled from "styled-components";
import youtubeLogo from "../../assets/logo/youtubeLogo.png";

const ImageBanner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 100%;
    height: auto;
    filter: brightness(40%);
  }
`;

const Title = styled.h1`
  position: absolute;
  color: white;
  font-size: 8vw;
  text-align: center;
  max-width: 90%;
`;

const DetailsOverlay = styled.div`
  position: absolute;
  bottom: 20px;
  left: 40px;
  color: white;
  font-size: 2rem;
  visibility: visible;

  @media screen and (max-width: 768px) {
    visibility: hidden;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 920px) {
    flex-direction: row;
  }
`;

const YoutubeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;

  @media screen and (min-width: 768px) {
    padding-right: 20px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  background-color: #ffe9d2;
`;

const LinkButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: red;

  img {
    width: 50px;
  }
`;

const TextInfoContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  font-weight: 600;
  margin: 10px;
  font-size: 1.5rem;

  @media screen and (min-width: 768px) {
    padding-left: 100px;
    padding-right: 100px;
  }
`;
const ContentDetailPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    imageUrlList: [], // 초기값으로 빈 배열 설정
  });
  const [imageList, setImageList] = useState([]);
  const [youtubePlayer, setYoutubePlayer] = useState(null);
  const [youtubeId, setYoutubeId] = useState("");

  const APIKey = "AIzaSyATe0kMwS3Z5fMM01lAA5kfR2olHS9EK44";

  useEffect(() => {
    getDetails(id);
  }, [id]);

  const getDetails = (id) => {
    axios
      .get(`/api/projects/${id}`)
      .then((response) => {
        const data = response.data;
        const content = {
          category: data.data.category,
          client: data.data.client,
          date: data.data.date,
          department: data.data.department,
          id: data.data.id,
          imageUrlList: data.data.imageUrlList,
          isPosted: data.data.isPosted,
          link: data.data.link,
          name: data.data.name,
          overView: data.data.overView,
        };
        setImageList(data.data.imageUrlList);
        setDetail(content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const imageBanner = imageList.map((image, index) => (
    <div key={index}>
      <img src={image} alt={`Slide ${index}`} />
    </div>
  ));

  const onReady = (event) => {
    // event.target is the YouTube player that gets passed by react-youtube
    setYoutubePlayer(event.target);
  };

  const renderVideoPlayer = () => {
    if (youtubePlayer && youtubePlayer.internalPlayer && detail.link) {
      youtubePlayer.internalPlayer.loadVideoById(detail.link);
    }
  };

  useEffect(() => {
    determineVideoType();
  }, [detail.link]);

  const determineVideoType = async () => {
    try {
      if (detail.link) {
        if (detail.link.includes("/@")) {
          // 채널의 가장 최근 영상
          const channelUsername = detail.link.split("/@")[1];
          const channelIdResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?key=${APIKey}&forUsername=${channelUsername}&part=id`
          );
          const channelId = channelIdResponse.data.items[0].id;
          const latestVideoResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelId}&part=id&order=date&type=video`
          );
          const latestVideoId = latestVideoResponse.data.items[0].id.videoId;
          setYoutubeId(latestVideoId);
        } else if (detail.link.includes("/playlist?list=")) {
          // 재생목록의 첫 번째 영상
          const playlistId = detail.link.split("list=")[1];
          const playlistResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems?key=${APIKey}&playlistId=${playlistId}&part=snippet&maxResults=1`
          );
          const firstVideoId =
            playlistResponse.data.items[0].snippet.resourceId.videoId;
          setYoutubeId(firstVideoId);
        } else if (detail.link.includes("/user/")) {
          // 채널의 가장 최근 영상
          const channelUsername = detail.link.split("/user/")[1];
          const channelIdResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?key=${APIKey}&forUsername=${channelUsername}&part=id`
          );
          const channelId = channelIdResponse.data.items[0].id;
          const latestVideoResponse = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelId}&part=id&order=date&type=video`
          );
          const latestVideoId = latestVideoResponse.data.items[0].id.videoId;
          setYoutubeId(latestVideoId);
        } else if (detail.link.includes("youtu.be")) {
          // 동영상 주소
          const videoId = detail.link.split("youtu.be/")[1];
          setYoutubeId(videoId);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Body>
      <ImageBanner>
        <img src={detail.imageUrlList[0]} alt="Banner" />
        <Title>{detail.name}</Title>
        <DetailsOverlay>
          <p>Date: {detail.date}</p>
          <p>Client: {detail.client}</p>
          <p>Category: {detail.category}</p>
        </DetailsOverlay>
      </ImageBanner>
      <DetailContainer>
        <YoutubeContainer>
          {detail.link && (
            <YouTube
              videoId={youtubeId}
              opts={{ width: "640", height: "390" }}
              onReady={onReady}
            />
          )}
        </YoutubeContainer>
        <InfoContainer>
          <TextInfoContainer>{detail.overView}</TextInfoContainer>
          <LinkButton href={detail.link} target="_blank">
            <img src={youtubeLogo} alt="YouTube Logo" />
            MORE
          </LinkButton>
        </InfoContainer>
      </DetailContainer>
    </Body>
  );
};

export default ContentDetailPage;
