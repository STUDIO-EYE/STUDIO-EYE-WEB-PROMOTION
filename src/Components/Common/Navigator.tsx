import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.white.bold};
  position: fixed;
  left: 0px;
  height: 100vh;
  width: 10rem;
  box-shadow: 1px 2px 20px 0.5px #c6c6c6;
`;

const SideBar = styled.div`
  width: 100%;
`;

const CategoryWrapper = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "rgb(0,0,0,0.1)" : "none")};

  padding: 1rem;
`;

const Icon = styled.div`
  display: flex;
  padding-bottom: 0.6rem;
  justify-content: center;
`;
const Category = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  font-weight: 600;
  color: ${({ selected }) =>
    selected ? theme.color.yellow.bold : theme.color.black.bold};
`;

enum Categories {
  "HOME" = "Home",
  "REQUEST" = "Request",
  "ARTWORK" = "Artwork",
  "PAGE_EDIT" = "Page Edit",
  "STATISTICS" = "Statistic",
  "SETTING" = "Setting",
  "FAQ" = "FAQ",
}

const categories = [
  {
    name: Categories.HOME,
    path: `/admin`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 10.9077C21.0015 10.6942 20.9584 10.4826 20.8737 10.2866C20.7889 10.0906 20.6643 9.91443 20.5077 9.76923L11 1L1.49234 9.76923C1.33577 9.91443 1.21113 10.0906 1.12637 10.2866C1.04162 10.4826 0.998591 10.6942 1.00004 10.9077V19.4615C1.00004 19.8695 1.16212 20.2609 1.45064 20.5494C1.73916 20.8378 2.13047 21 2.53849 21H19.4615C19.8695 21 20.2609 20.8378 20.5493 20.5494C20.838 20.2609 21 19.8695 21 19.4615V10.9077Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11 20.9995V14.8457"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 10.9077C21.0015 10.6942 20.9584 10.4826 20.8737 10.2866C20.7889 10.0906 20.6643 9.91443 20.5077 9.76923L11 1L1.49234 9.76923C1.33577 9.91443 1.21113 10.0906 1.12637 10.2866C1.04162 10.4826 0.998591 10.6942 1.00004 10.9077V19.4615C1.00004 19.8695 1.16212 20.2609 1.45064 20.5494C1.73916 20.8378 2.13047 21 2.53849 21H19.4615C19.8695 21 20.2609 20.8378 20.5493 20.5494C20.838 20.2609 21 19.8695 21 19.4615V10.9077Z"
          stroke="#FFA900"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.REQUEST,
    path: `/admin/${Categories.REQUEST.toLowerCase()}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.17148 17.1546L12.5246 20.49C12.7303 20.7006 12.9876 20.854 13.2708 20.9349C13.5541 21.0158 13.8536 21.0214 14.1397 20.9511C14.4275 20.8842 14.6933 20.7445 14.9115 20.5452C15.1297 20.346 15.293 20.0942 15.3855 19.8137L20.892 3.32117C21.007 3.01215 21.0307 2.67666 20.9604 2.35457C20.89 2.03246 20.7287 1.73732 20.4954 1.50421C20.2622 1.2711 19.9668 1.10983 19.6445 1.03956C19.3221 0.969292 18.9864 0.992986 18.6772 1.10783L2.17297 6.61045C1.88264 6.70954 1.62407 6.88432 1.42397 7.11671C1.22386 7.34909 1.08949 7.63066 1.03474 7.93231C0.978233 8.20666 0.990812 8.49074 1.07136 8.75903C1.1519 9.02731 1.29788 9.2714 1.49619 9.46935L5.71068 13.6809L5.57224 19.0145L9.17148 17.1546Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3999 1.44629L5.71069 13.6812"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.17148 17.1546L12.5246 20.49C12.7303 20.7006 12.9876 20.854 13.2708 20.9349C13.5541 21.0158 13.8536 21.0214 14.1397 20.9511C14.4275 20.8842 14.6933 20.7445 14.9115 20.5452C15.1297 20.346 15.293 20.0942 15.3855 19.8137L20.892 3.32117C21.007 3.01215 21.0307 2.67666 20.9604 2.35457C20.89 2.03246 20.7287 1.73732 20.4954 1.50421C20.2622 1.2711 19.9668 1.10983 19.6445 1.03956C19.3221 0.969292 18.9864 0.992986 18.6772 1.10783L2.17297 6.61045C1.88264 6.70954 1.62407 6.88432 1.42397 7.11671C1.22386 7.34909 1.08949 7.63066 1.03474 7.93231C0.978233 8.20666 0.990812 8.49074 1.07136 8.75903C1.1519 9.02731 1.29788 9.2714 1.49619 9.46935L5.71068 13.6809L5.57224 19.0145L9.17148 17.1546Z"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.3999 1.44629L5.71069 13.6812"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.ARTWORK,
    path: `/admin/${Categories.ARTWORK.toLowerCase()}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4615 1H2.53846C1.68879 1 1 1.68879 1 2.53846V19.4615C1 20.3112 1.68879 21 2.53846 21H19.4615C20.3112 21 21 20.3112 21 19.4615V2.53846C21 1.68879 20.3112 1 19.4615 1Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 5.61523H21"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.15381 5.61523V20.9998"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 13.3086H7.15381"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4615 1H2.53846C1.68879 1 1 1.68879 1 2.53846V19.4615C1 20.3112 1.68879 21 2.53846 21H19.4615C20.3112 21 21 20.3112 21 19.4615V2.53846C21 1.68879 20.3112 1 19.4615 1Z"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 5.61523H21"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M7.15381 5.61523V20.9998"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 13.3086H7.15381"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.PAGE_EDIT,
    path: `/admin/${Categories.PAGE_EDIT.toLowerCase().replace(/\s+/g, "")}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.46 21H12"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 2H12"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 7H12"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 12H12"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 17H12"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 1.83333V8.49993C1 8.96016 1.3444 9.33326 1.76923 9.33326H7.92307C8.3479 9.33326 8.6923 8.96016 8.6923 8.49993V1.83333C8.6923 1.3731 8.3479 1 7.92307 1H1.76923C1.3444 1 1 1.3731 1 1.83333Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 13.5013V20.1679C1 20.6281 1.3444 21.0012 1.76923 21.0012H7.92307C8.3479 21.0012 8.6923 20.6281 8.6923 20.1679V13.5013C8.6923 13.0411 8.3479 12.668 7.92307 12.668H1.76923C1.3444 12.668 1 13.0411 1 13.5013Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.46 21H12"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 2H12"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 7H12"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 12H12"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.4615 17H12"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 1.83333V8.49993C1 8.96016 1.3444 9.33326 1.76923 9.33326H7.92307C8.3479 9.33326 8.6923 8.96016 8.6923 8.49993V1.83333C8.6923 1.3731 8.3479 1 7.92307 1H1.76923C1.3444 1 1 1.3731 1 1.83333Z"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 13.5013V20.1679C1 20.6281 1.3444 21.0012 1.76923 21.0012H7.92307C8.3479 21.0012 8.6923 20.6281 8.6923 20.1679V13.5013C8.6923 13.0411 8.3479 12.668 7.92307 12.668H1.76923C1.3444 12.668 1 13.0411 1 13.5013Z"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.STATISTICS,
    path: `/admin/${Categories.STATISTICS.toLowerCase()}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.00098V21.001H21"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.61523 10.2332L9.46139 14.0794L15.6152 4.84863L20.9998 8.69479"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1.00098V21.001H21"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.61523 10.2332L9.46139 14.0794L15.6152 4.84863L20.9998 8.69479"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.SETTING,
    path: `/admin/${Categories.SETTING.toLowerCase()}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.03414 3.69328L8.75465 1.98559C8.87617 1.69646 9.08996 1.44776 9.36801 1.27207C9.64608 1.09638 9.97544 1.00189 10.313 1.00098H11.687C12.0245 1.00189 12.3539 1.09638 12.6319 1.27207C12.91 1.44776 13.1238 1.69646 13.2453 1.98559L13.9658 3.69328L16.4122 4.98559L18.3894 4.70867C18.7186 4.66764 19.0538 4.71739 19.3522 4.85162C19.6505 4.98585 19.8986 5.19848 20.065 5.46252L20.7353 6.53944C20.907 6.80767 20.9863 7.11741 20.9623 7.42778C20.9383 7.73815 20.8125 8.03456 20.6012 8.2779L19.378 9.70867V12.2933L20.6347 13.7241C20.846 13.9674 20.9719 14.2638 20.9958 14.5742C21.0198 14.8845 20.9405 15.1943 20.7688 15.4625L20.0985 16.5394C19.9321 16.8034 19.684 17.0161 19.3857 17.1504C19.0873 17.2845 18.7522 17.3344 18.4229 17.2933L16.4457 17.0164L13.9993 18.3087L13.2788 20.0164C13.1573 20.3054 12.9435 20.5542 12.6655 20.7299C12.3874 20.9056 12.058 21.0001 11.7205 21.001H10.313C9.97544 21.0001 9.64608 20.9056 9.36801 20.7299C9.08996 20.5542 8.87617 20.3054 8.75465 20.0164L8.03414 18.3087L5.58774 17.0164L3.61051 17.2933C3.28128 17.3344 2.94619 17.2845 2.64783 17.1504C2.34949 17.0161 2.10133 16.8034 1.93489 16.5394L1.26464 15.4625C1.09289 15.1943 1.01377 14.8845 1.0377 14.5742C1.06162 14.2638 1.1875 13.9674 1.39869 13.7241L2.62189 12.2933V9.70867L1.36518 8.2779C1.15398 8.03456 1.02811 7.73815 1.00418 7.42778C0.980256 7.11741 1.05938 6.80767 1.23113 6.53944L1.90138 5.46252C2.06782 5.19848 2.31597 4.98585 2.61432 4.85162C2.91268 4.71739 3.24777 4.66764 3.57699 4.70867L5.55422 4.98559L8.03414 3.69328ZM7.64875 11.001C7.64875 11.6095 7.8453 12.2044 8.21353 12.7104C8.58178 13.2164 9.10516 13.6108 9.71751 13.8437C10.3299 14.0766 11.0037 14.1375 11.6538 14.0188C12.3038 13.9001 12.901 13.607 13.3697 13.1767C13.8383 12.7464 14.1575 12.1981 14.2868 11.6013C14.4161 11.0044 14.3498 10.3857 14.0961 9.82348C13.8425 9.26125 13.4129 8.7807 12.8618 8.44261C12.3107 8.10452 11.6628 7.92405 11 7.92405C10.1112 7.92405 9.25878 8.24822 8.63031 8.82527C8.00183 9.4023 7.64875 10.1849 7.64875 11.001Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.03414 3.69328L8.75465 1.98559C8.87617 1.69646 9.08996 1.44776 9.36801 1.27207C9.64608 1.09638 9.97544 1.00189 10.313 1.00098H11.687C12.0245 1.00189 12.3539 1.09638 12.6319 1.27207C12.91 1.44776 13.1238 1.69646 13.2453 1.98559L13.9658 3.69328L16.4122 4.98559L18.3894 4.70867C18.7186 4.66764 19.0538 4.71739 19.3522 4.85162C19.6505 4.98585 19.8986 5.19848 20.065 5.46252L20.7353 6.53944C20.907 6.80767 20.9863 7.11741 20.9623 7.42778C20.9383 7.73815 20.8125 8.03456 20.6012 8.2779L19.378 9.70867V12.2933L20.6347 13.7241C20.846 13.9674 20.9719 14.2638 20.9958 14.5742C21.0198 14.8845 20.9405 15.1943 20.7688 15.4625L20.0985 16.5394C19.9321 16.8034 19.684 17.0161 19.3857 17.1504C19.0873 17.2845 18.7522 17.3344 18.4229 17.2933L16.4457 17.0164L13.9993 18.3087L13.2788 20.0164C13.1573 20.3054 12.9435 20.5542 12.6655 20.7299C12.3874 20.9056 12.058 21.0001 11.7205 21.001H10.313C9.97544 21.0001 9.64608 20.9056 9.36801 20.7299C9.08996 20.5542 8.87617 20.3054 8.75465 20.0164L8.03414 18.3087L5.58774 17.0164L3.61051 17.2933C3.28128 17.3344 2.94619 17.2845 2.64783 17.1504C2.34949 17.0161 2.10133 16.8034 1.93489 16.5394L1.26464 15.4625C1.09289 15.1943 1.01377 14.8845 1.0377 14.5742C1.06162 14.2638 1.1875 13.9674 1.39869 13.7241L2.62189 12.2933V9.70867L1.36518 8.2779C1.15398 8.03456 1.02811 7.73815 1.00418 7.42778C0.980256 7.11741 1.05938 6.80767 1.23113 6.53944L1.90138 5.46252C2.06782 5.19848 2.31597 4.98585 2.61432 4.85162C2.91268 4.71739 3.24777 4.66764 3.57699 4.70867L5.55422 4.98559L8.03414 3.69328ZM7.64875 11.001C7.64875 11.6095 7.8453 12.2044 8.21353 12.7104C8.58178 13.2164 9.10516 13.6108 9.71751 13.8437C10.3299 14.0766 11.0037 14.1375 11.6538 14.0188C12.3038 13.9001 12.901 13.607 13.3697 13.1767C13.8383 12.7464 14.1575 12.1981 14.2868 11.6013C14.4161 11.0044 14.3498 10.3857 14.0961 9.82348C13.8425 9.26125 13.4129 8.7807 12.8618 8.44261C12.3107 8.10452 11.6628 7.92405 11 7.92405C10.1112 7.92405 9.25878 8.24822 8.63031 8.82527C8.00183 9.4023 7.64875 10.1849 7.64875 11.001Z"
          stroke="#FFA900"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
  {
    name: Categories.FAQ,
    path: `/admin/${Categories.FAQ.toLowerCase()}`,
    svg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7692 1H4.07692C3.66889 1 3.27758 1.16209 2.98906 1.4506C2.70055 1.73912 2.53846 2.13043 2.53846 2.53846V16.3846L1 21L7.15385 19.4615H19.4615C19.8695 19.4615 20.2609 19.2994 20.5494 19.0109C20.8378 18.7225 21 18.3311 21 17.9231V10.2308"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.0973 12.7486L8.48193 13.5793L9.25116 8.9024L16.5281 1.65625C16.6711 1.51205 16.8412 1.39759 17.0288 1.31949C17.2161 1.24138 17.4172 1.20117 17.6205 1.20117C17.8235 1.20117 18.0246 1.24138 18.212 1.31949C18.3995 1.39759 18.5697 1.51205 18.7128 1.65625L20.3435 3.28701C20.4877 3.43003 20.6021 3.6002 20.6803 3.78767C20.7583 3.97514 20.7986 4.17623 20.7986 4.37932C20.7986 4.58241 20.7583 4.7835 20.6803 4.97098C20.6021 5.15846 20.4877 5.32861 20.3435 5.47163L13.0973 12.7486Z"
          stroke="black"
          stroke-opacity="0.4"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
    selectedSvg: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.7692 1H4.07692C3.66889 1 3.27758 1.16209 2.98906 1.4506C2.70055 1.73912 2.53846 2.13043 2.53846 2.53846V16.3846L1 21L7.15385 19.4615H19.4615C19.8695 19.4615 20.2609 19.2994 20.5494 19.0109C20.8378 18.7225 21 18.3311 21 17.9231V10.2308"
          stroke="#FFA900"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.0973 12.7486L8.48193 13.5793L9.25116 8.9024L16.5281 1.65625C16.6711 1.51205 16.8412 1.39759 17.0288 1.31949C17.2161 1.24138 17.4172 1.20117 17.6205 1.20117C17.8235 1.20117 18.0246 1.24138 18.212 1.31949C18.3995 1.39759 18.5697 1.51205 18.7128 1.65625L20.3435 3.28701C20.4877 3.43003 20.6021 3.6002 20.6803 3.78767C20.7583 3.97514 20.7986 4.17623 20.7986 4.37932C20.7986 4.58241 20.7583 4.7835 20.6803 4.97098C20.6021 5.15846 20.4877 5.32861 20.3435 5.47163L13.0973 12.7486Z"
          stroke="#FFA900"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    ),
  },
];

function Navigator() {
  const location = useLocation();

  const [selectedMenu, setSelectedMenu] = useState(
    location.pathname.split("/")[2]
  );
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedMenu(location.pathname.split("/")[2]);
  }, [location]);

  return (
    <Wrapper>
      <SideBar>
        {categories.map((category, index) => (
          <CategoryWrapper
            key={index}
            onClick={() => {
              navigate(`${category.path}`);
              setSelectedMenu(location.pathname.split("/")[2]);
            }}
            selected={category.path.includes(selectedMenu) ? true : false}
          >
            <Icon>
              {category.path.includes(selectedMenu)
                ? category.selectedSvg
                : category.svg}
            </Icon>
            <Category
              selected={category.path.includes(selectedMenu) ? true : false}
            >
              {category.name}
            </Category>
          </CategoryWrapper>
        ))}
      </SideBar>
    </Wrapper>
  );
}

export default Navigator;
