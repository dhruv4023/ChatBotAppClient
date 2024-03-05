import AboutUs from '../Pages/AboutUs/AboutUs'
import { LoginPage } from '../Pages/LoginPage/LoginPage'
import PageNotFound from '../Pages/Error/PageNotFound'
import { ProfilePage } from '../Pages/ProfilePage/ProfilePage'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../Pages/HomePage/HomePage'
import RenderChat from '../Pages/chat/RenderChat'
import ChatWithPdf from '../Pages/chat/ChatWithPdf'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/auth/:page'} element={<LoginPage />} />
      <Route path={'/about'} element={<AboutUs />} />
      <Route path={'/profile/:UID'} element={<ProfilePage />} />
      <Route path={'/chat-with-pdf'} element={<ChatWithPdf />} />
      <Route path={'/chat/:collectionName'} element={<RenderChat />} />
      <Route path={'/404'} element={<PageNotFound />} />
    </Routes>
  )
}
