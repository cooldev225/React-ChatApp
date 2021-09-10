import React, { useState } from 'react';
import Context from './index';

const CustomizerProvider = (props) => {
  
  // set sidebar background layout
  const addSidebarBackgroundLayout = (e, layout) => {
    e.preventDefault();
    document.querySelectorAll('.theme-layout-type li').forEach((item) => {
      item.classList.remove('active');
    });
    document.body.className = `sidebar-active main-page ${layout}`;
    e.currentTarget.classList.add('active');
  };

  // set layout theme to LTR or RTL
  const addLayoutType = (layoutType) => {
    if (layoutType) {
      document.body.className = `sidebar-active main-page rtl ${localStorage.getItem(
        'layout_mode'
      )}`;
      document.querySelector('.rtl-setting').className =
        'rtl-setting icon-btn btn-primary rtl';
    } else {
      document.body.className = `sidebar-active main-page ${localStorage.getItem(
        'layout_mode'
      )}`;
      document.querySelector('.rtl-setting').className =
        'rtl-setting icon-btn btn-primary';
    }
  };

  // set left sidebar to open/close
  const addSidebarTypes = (e, sidebarType) => {
    e.preventDefault();
    document.querySelectorAll('.sidebar-type li').forEach((item) => {
      item.classList.remove('active');
    });
    document.querySelector('.main-nav').className = 'main-nav ' + sidebarType;
    e.currentTarget.classList.add('active');
  };

  // set themes primary colors
  const addThemeColors = (e, color) => {
    document.querySelectorAll('.colors li').forEach((item) => {
      item.classList.remove('active');
    });
    // document.getElementById("color").setAttribute("href", `/assets/css/${color}.css`);
    document.documentElement.className = color || localStorage.getItem('color');
    e.currentTarget.classList.add('active');
    localStorage.setItem('color', color);
  };

  // set wallpapers for chats content
  const addBackgroundWallpaper = (e, wallpaper) => {
    document.querySelectorAll('.wallpaper li').forEach((item) => {
      item.classList.remove('active');
    });

    if (wallpaper === 0) {
      document.querySelector(
        '.wallpapers'
      ).style = `background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(rgb(239, 247, 254))); background-color: transparent; background-blend-mode: unset;`;
    } else {
      document.querySelector(
        '.wallpapers'
      ).style = `background-image: url(${`/assets/images/wallpaper/${wallpaper}.jpg`}) ; background-color: transparent; background-blend-mode: unset`;
    }
    e.currentTarget.classList.add('active');
  };

  // set wallpapers as gradients for chats content
  const addBackgroundWallpaperGradients = (gradient) => {
    //setBackgroundWallpaperGradients(gradient)
  };

  return (
    <Context.Provider
      value={{
        addSidebarBackgroundLayout: addSidebarBackgroundLayout,
        addLayoutType: addLayoutType,
        addSidebarTypes: addSidebarTypes,
        addThemeColors: addThemeColors,
        addBackgroundWallpaper: addBackgroundWallpaper,
        addBackgroundWallpaperGradients: addBackgroundWallpaperGradients,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default CustomizerProvider;
