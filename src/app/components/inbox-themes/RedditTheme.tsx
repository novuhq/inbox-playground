"use client";
import React, { useState } from "react";
// import Image from 'next/image'; // Import the Image component
import { Inbox, Notification, Notifications, Preferences } from "@novu/react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaReddit, FaRegCommentDots } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineShareAlt,
  AiOutlineArrowLeft,
  AiOutlineHome,
} from "react-icons/ai";
import { FiBell, FiPlus, FiMail } from "react-icons/fi";
import {
  BiMessageSquareDetail,
  BiHash,
  BiStar,
  BiCompass,
} from "react-icons/bi";
import { TbClick } from "react-icons/tb"; // Click icon (or similar)
import { BsBellFill, BsArrowUp, BsFillChatLeftTextFill } from "react-icons/bs"; // Dot icon
import { FiSettings, FiMoreHorizontal } from "react-icons/fi";
import { FaBell } from "react-icons/fa";

const RedditTheme = ({ subscriberId }: { subscriberId: string | null }) => {
  const { selectedTheme } = useTheme();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
  const [currentView, setCurrentView] = useState("notifications");

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setCurrentView("notifications");
  };

  const showPreferences = () => {
    setCurrentView("preferences");
  };

  const novuConfig: any = {
    applicationIdentifier: process.env.NEXT_PUBLIC_NOVU_CLIENT_APP_ID,
    subscriberId: subscriberId,
    open: true,
    appearance: selectedTheme?.appearance,
  };

  return (
    <div className="w-full max-w-[1200px] h-screen min-h-[400px] max-h-[100%] bg-white rounded-lg shadow-md p-4 overflow-hidden font-sans">
      {/* Navbar */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        {/* Left side of Navbar */}
        <div className="flex items-center">
          <FaReddit size={32} className="text-red-500 mr-1" />
          <h1 className="text-lg font-bold text-red-500">reddit</h1>
        </div>

        {/* Center of Navbar - Search bar */}
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 ml-20">
          <AiOutlineSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search Reddit"
            className="bg-gray-200 outline-none"
          />
        </div>

        {/* Right side of Navbar */}
        <div className="flex items-center space-x-1">
          <TbClick
            size={25}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
          />
          <BiMessageSquareDetail
            size={25}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
          />
          <FiPlus
            size={25}
            className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
          />
          <span className="text-sm font-medium cursor-pointer hover:bg-gray-200 rounded-full p-1">
            Create
          </span>
          {/* Bell Icon with Click Event */}
          <div className="relative">
            <FaBell
              size={25}
              className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
              onClick={toggleNotifications}
            />

            {/* Notification Window */}
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-[400px] h-[472px] bg-white border rounded-lg shadow-lg z-10 flex flex-col">
                {/* Tabs */}
                <div className="flex justify-between items-center border-b p-3">
                  <div className="flex flex-grow space-x-4 justify-center">
                    <button className="w-1/2 font-semibold text-center">
                      {currentView === "preferences"
                        ? "Preferences"
                        : "Notifications"}
                    </button>
                    {currentView === "notifications" && (
                      <div className="w-1/2 text-gray-500 text-center">
                        Messages
                      </div>
                    )}
                  </div>
                </div>

                {/* Mark all as read and Settings */}
                <div className="flex justify-between items-center mb-4 mt-4">
                  {currentView === "notifications" ? (
                    <>
                      <span className="text-sm font-normal ml-3">TODAY</span>
                      <div className="flex items-center space-x-4 mr-3">
                        <button className="text-sm font-bold">
                          Mark all as read
                        </button>
                        <FiSettings
                          className="text-gray-500 cursor-pointer"
                          size={18}
                          onClick={showPreferences}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-4 ml-3">
                      <AiOutlineArrowLeft
                        className="text-gray-500 cursor-pointer"
                        size={18}
                        onClick={() => setCurrentView("notifications")}
                      />
                      <span className="text-sm font-semibold">
                        Back to Notifications
                      </span>
                    </div>
                  )}
                </div>

                {/* Notifications List or Preferences using Novu Inbox */}
                {subscriberId && (
                  <Inbox {...novuConfig}>
                    {currentView === "notifications" ? (
                      <Notifications
                        renderNotification={(notification) => (
                          <InboxItem notification={notification} />
                        )}
                      />
                    ) : (
                      <Preferences />
                    )}
                  </Inbox>
                )}
              </div>
            )}
          </div>
          {/* Avatar Image */}
          <img
            src="https://styles.redditmedia.com/t5_4hy1ad/styles/profileIcon_snooaa71dd87-6310-46ae-9ba8-02f37e4271bc-headshot.png?width=128&height=128&frame=1&auto=webp&crop=128:128,smart&s=23622e6012eab57c189c8586ca7c8f2f7ef2c3ae"
            alt="User Avatar"
            className="cursor-pointer rounded-full hover:bg-gray-200 p-1"
            width="32"
            height="32"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex h-[calc(100%-48px)]">
        {/* Left Sidebar (Moderation) */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-sm mr-4 h-full flex-grow-0 overflow-y-auto">
          {/* Home Section */}
          <div className="mb-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <AiOutlineHome className="text-lg" />
                <span>Home</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>Popular</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <BiCompass className="text-lg" />
                <span>Explore</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>All</span>
              </li>
            </ul>
          </div>

          <hr className="my-2" />

          {/* Moderation Section */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Moderation
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <BiMessageSquareDetail className="text-lg" />
                <span>Mod Queue</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <FiMail className="text-lg" />
                <span>Mod Mail</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>r/Mod</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <FaReddit className="text-lg text-red-500" />
                <span>r/novuhq</span>
                <BiStar className="text-lg text-gray-500 ml-auto" />
              </li>
            </ul>
          </div>

          <hr className="my-2" />

          {/* Custom Feeds Section */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Custom Feeds
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                <FiPlus className="text-lg" />
                <span>Create a custom feed</span>
              </li>
            </ul>
          </div>

          <hr className="my-2" />

          {/* Recent Section */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Recent
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>r/nextjs</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>r/javascript</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>r/ProgrammerHumor</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
                <BiHash className="text-lg" />
                <span>r/node</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content (Post Section) */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-sm h-full overflow-y-auto">
          {/* First Post */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4 hover:bg-gray-100">
            <div className="flex items-center mb-2">
              <div className="flex items-center space-x-2">
                <FaReddit size={20} className="text-yellow-400" />
                <span className="text-sm font-medium">r/SideProject</span>
                <span className="text-xs text-gray-500">1 hr. ago</span>
              </div>
            </div>
            <h2 className="text-lg font-bold mb-2">
              Just made my first sale!! 🥳
            </h2>
            <div className="p-4 bg-gray-50 rounded-md mb-2">
              <h3 className="font-semibold">
                Congratulations VideoFaceSwap AI!
              </h3>
              <p className="text-sm text-gray-600">
                You&apos;ve just received your first payment through Stripe.
              </p>
              <p className="text-sm text-gray-600">
                Your first payout for this payment of $29.00 (minus any fees)
                should land in your bank account on 9/7/24.
              </p>
            </div>

            {/* Post Action Buttons */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <AiOutlineArrowUp />
                <span>29</span>
                <AiOutlineArrowDown />
              </button>
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <FaRegCommentDots />
                <span>5</span>
              </button>
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <AiOutlineShareAlt />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Second Post */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4 hover:bg-gray-100">
            <div className="flex items-center mb-2">
              <div className="flex items-center space-x-2">
                <FaReddit size={20} className="text-pink-400" />
                <span className="text-sm font-medium">r/Nextjs</span>
                <span className="text-xs text-gray-500">2 hrs. ago</span>
              </div>
            </div>
            <h2 className="text-lg font-bold mb-2">
              Launching my first web app! 🚀
            </h2>
            <div className="p-4 bg-gray-50 rounded-md mb-2">
              <h3 className="font-semibold">
                Excited to share my new web app!
              </h3>
              <p className="text-sm text-gray-600">
                I&apos;ve been working on a side project for the last 3 months,
                and it&apos;s finally live! It&apos;s a tool to help freelancers
                manage their time more efficiently.
              </p>
              <p className="text-sm text-gray-600">
                Would love any feedback or suggestions. Check it out at
                mywebsite.com!
              </p>
            </div>
            {/* Post Action Buttons */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <AiOutlineArrowUp />
                <span>14</span>
                <AiOutlineArrowDown />
              </button>
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <FaRegCommentDots />
                <span>8</span>
              </button>
              <button className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                <AiOutlineShareAlt />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Third Post */}
          <div className="p-4 bg-white rounded-lg border border-gray-200 mb-4 hover:bg-gray-100">
            <div className="flex items-center mb-2">
              <div className="flex items-center space-x-2">
                <FaReddit size={20} className="text-blue-400" />
                <span className="text-sm font-medium">Novu Updates</span>
                <span className="text-xs text-gray-500">2 hrs. ago</span>
              </div>
            </div>
            <h2 className="text-lg font-bold mb-2">
              New Novu Feature: Multi-channel Notifications! 🚀
            </h2>
            <div className="p-4 bg-gray-50 rounded-md mb-2">
              <h3 className="font-semibold">
                Exciting update to our notification infrastructure!
              </h3>
              <p className="text-sm text-gray-600">
                We&apos;ve just released a new feature that allows you to send
                notifications across multiple channels simultaneously. Now you
                can reach your users via email, SMS, and push notifications with
                a single API call!
              </p>
              <p className="text-sm text-gray-600">
                Check out our documentation at docs.novu.co for integration
                details and best practices.
              </p>
            </div>
            {/* Post Action Buttons */}
            <div className="flex items-center mt-4 space-x-4">
              <button className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-full">
                <AiOutlineArrowUp />
                <span>42</span>
                <AiOutlineArrowDown />
              </button>
              <button className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-full">
                <FaRegCommentDots />
                <span>15</span>
              </button>
              <button className="flex items-center space-x-1 bg-blue-100 px-2 py-1 rounded-full">
                <AiOutlineShareAlt />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Recent Posts) */}
        <div className="w-1/4 bg-gray-50 p-4 rounded-lg shadow-sm ml-4 h-full flex-grow-0 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Recent Posts</h3>
            <button className="text-blue-500 text-sm">Clear</button>
          </div>
          <ul className="space-y-4 text-sm">
            {/* Post 1 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">Posted in r/javascript</p>
              <p className="font-medium">
                Found an open-source codebase that&apos;s similar to Skool
                (Learning Management...)
              </p>
              <p className="text-xs text-gray-500">250 upvotes · 42 comments</p>
            </li>

            {/* Post 2 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">Posted in r/javascript</p>
              <p className="font-medium">
                70% of npm packages from the last 6 months are spam
              </p>
              <p className="text-xs text-gray-500">250 upvotes · 42 comments</p>
            </li>

            {/* Post 3 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">Posted in r/sidehustle</p>
              <p className="font-medium">Need to make $50/day desperately</p>
              <p className="text-xs text-gray-500">10 upvotes · 37 comments</p>
            </li>

            {/* Post 4 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">
                Posted in r/learnprogramming
              </p>
              <p className="font-medium">
                Extensive use of Foo Bar in examples
              </p>
              <p className="text-xs text-gray-500">161 upvotes · 64 comments</p>
            </li>

            {/* Post 5 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">Posted in r/reactjs</p>
              <p className="font-medium">
                The &apos;Wrong Way&apos; To Use React
              </p>
              <p className="text-xs text-gray-500">7 comments</p>
            </li>

            {/* Post 6 */}
            <li className="flex flex-col hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <p className="text-gray-500 text-xs">Posted in r/nextjs</p>
              <p className="font-medium">
                The &apos;Wrong Way&apos; To Use React
              </p>
              <p className="text-xs text-gray-500">9 comments</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const InboxItem = ({ notification }: { notification: Notification }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      notification.read();
    }
  };

  // Function to determine the icon based on the notification tag
  const getNotificationIcon = () => {
    if (notification.tags?.includes("Upvote")) {
      return <BsArrowUp size={10} className="text-green-500" />;
    } else if (
      notification.tags?.includes("ReplyToPost") ||
      notification.tags?.includes("ReplyToComment")
    ) {
      return <BsFillChatLeftTextFill size={10} className="text-red-500" />;
    } else {
      // Return a default icon or handle the case where no tags match
      return <BsBellFill size={10} />;
    }
  };

  return (
    <div
      className={`flex items-start px-4 py-2 border-b border-gray-200 ${
        notification.isRead ? "bg-white" : "bg-blue-50"
      } hover:bg-gray-100 relative`}
      onClick={handleMarkAsRead} // Add click handler here
    >
      {/* Avatar with Notification Type Icon */}
      <div className="relative">
        <img
          src={
            notification.avatar ||
            "https://styles.redditmedia.com/t5_4hy1ad/styles/profileIcon_snooaa71dd87-6310-46ae-9ba8-02f37e4271bc-headshot.png?width=128&height=128&frame=1&auto=webp&crop=128:128,smart&s=23622e6012eab57c189c8586ca7c8f2f7ef2c3ae"
          }
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        {/* Notification Type Icon */}
        <span className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 border border-gray-200">
          {getNotificationIcon()}
        </span>
      </div>
      {/* Notification Content */}
      <div className="flex-1 ml-3">
        <div className="flex justify-between items-center">
          {/* Notification Subject and Time */}
          <div>
            <p className="text-sm font-semibold text-gray-900 flex items-center">
              {notification.subject}
              <span className="mx-1 text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {formatTime(notification.createdAt)}
              </span>
            </p>
          </div>
          {/* More Options Wrapper */}
          <div
            className="relative group"
            onClick={(e) => e.stopPropagation()} // Prevent parent click handler
          >
            <FiMoreHorizontal
              className="text-gray-500 cursor-pointer"
              size={16}
              onClick={() => setShowOptions(!showOptions)}
            />
            {/* Options Dropdown, visible on hover */}
            <div className="absolute right-0 top-0 bg-white border border-gray-200 shadow-lg hidden group-hover:block">
              <div className="hover:bg-gray-100 p-2 rounded cursor-pointer">
                <button
                  className="w-full text-sm text-gray-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent click handler
                    notification.archive();
                  }}
                >
                  Hide
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Notification Body */}
        <p className="text-sm font-normal mt-1 text-gray-700">
          {notification.body}
        </p>

        {/* Primary and Secondary Actions */}
        <div className="mt-2">
          {notification.primaryAction && (
            <button
              className="text-blue-500 text-sm mr-2"
              onClick={(e) => e.stopPropagation()} // Prevent parent click handler
            >
              {notification.primaryAction.label || "Reply"}
            </button>
          )}
          {notification.secondaryAction && (
            <button
              className="text-gray-500 text-sm"
              onClick={(e) => e.stopPropagation()} // Prevent parent click handler
            >
              {notification.secondaryAction.label || "Dismiss"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format time
function formatTime(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date().getTime();
  const diffInSeconds = Math.floor((now - date.getTime()) / 1000);

  // Time calculations
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInWeek = secondsInDay * 7;
  const secondsInYear = secondsInDay * 365;

  if (diffInSeconds < secondsInMinute) {
    return `${diffInSeconds}s`;
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes}m`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours}h`;
  } else if (diffInSeconds < secondsInWeek) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days}d`;
  } else if (diffInSeconds < secondsInYear) {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    }; // Corrected type
    return date.toLocaleDateString(undefined, options); // e.g., "Feb 26"
  } else {
    return date.getFullYear().toString(); // e.g., "2022"
  }
}

export default RedditTheme;
