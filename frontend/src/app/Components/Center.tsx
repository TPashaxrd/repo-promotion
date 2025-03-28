"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IMGH from "../Images/github-restaurant.png";
import { config } from "./data/config";
import { BiDownload } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { LuCopyCheck } from "react-icons/lu";
import ReactMarkdown from "react-markdown"; 
import { CgClose } from "react-icons/cg";

const Center: React.FC = () => {
  const [repoData, setRepoData] = useState<{
    stars: number | null;
    watchers: number | null;
    forks: number | null;
  }>({
    stars: null,
    watchers: null,
    forks: null,
  });
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showReadme, setShowReadme] = useState(false);
  const [showPicture, setShowPicture] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${config.githubRepo}`
        );
        const data = await response.json();

        setRepoData({
          stars: data.stargazers_count || 0,
          watchers: data.watchers_count || 0,
          forks: data.forks_count || 0,
        });
      } catch (error) {
        console.error("GitHub API error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showReadme) {
      const fetchReadme = async () => {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${config.githubRepo}/readme`,
            {
              headers: {
                Accept: "application/vnd.github.v3.raw",
              },
            }
          );
          const text = await response.text();
          setReadmeContent(text);
        } catch (error) {
          console.error("Error fetching README:", error);
          setReadmeContent("Failed to load README.");
        }
      };

      fetchReadme();
    }
  }, [showReadme]);

  const gotoGithub = () => {
    window.open(config.githubUrl, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`git clone ${config.githubUrl}`);
    setCopied(true);
    toast.success(`Copied! ${config.githubRepo}`, {
      style: {
        backgroundColor: "#1D2021",
        color: "#D4BE98",
      },
    });

    setTimeout(() => setCopied(false), 55000);
  };

  const downloadRepo = () => {
    const zipUrl = `https://github.com/${config.githubRepo}/archive/refs/heads/master.zip`;
    window.location.href = zipUrl;
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 4000);
  };

  function readmeToggle() {
    setShowReadme(!showReadme);
  }
  function openImage() {
    setShowPicture(!showPicture);
  }

  return (
    <div className="bg-[#282828]">
      <div className="flex flex-col md:flex-row bg-[#282828] px-45 py-19 justify-between items-center gap-8">
        <div className="flex flex-col gap-4 max-w-md">
          <h1 className="text-2xl font-bold">{config.prodName.toUpperCase()}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BsStar className="text-yellow-400" />
              <strong>Stars:</strong> {repoData.stars ?? "Loading..."}
            </div>
            <div className="flex items-center gap-2">
              <strong>Watchers:</strong> {repoData.watchers ?? "Loading..."}
            </div>
            <div className="flex items-center gap-2">
              <strong>Forks:</strong> {repoData.forks ?? "Loading..."}
            </div>
          </div>

          <div>
            <h3 className="font-bold gap-2 mb-2 flex">
              How To Clone?
              <button
                onClick={readmeToggle}
                className="bg-blue-700 px-2 rounded hover:underline hover:bg-blue-800 cursor-pointer text-white"
              >
                README
              </button>
            </h3>
            <div className="bg-[#1D2021] text-white rounded-lg shadow-lg w-full p-4">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
                <div className="text-sm font-bold text-green-400 flex gap-2 items-center">
                  {copied ? (
                    <LuCopyCheck size={18} />
                  ) : (
                    <FaCopy
                      size={14}
                      className="cursor-pointer"
                      onClick={copyToClipboard}
                    />
                  )}
                  Bash Clone
                </div>
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div
                className="text-sm text-gray-200 cursor-pointer hover:bg-gray-800 p-1 rounded"
                onClick={copyToClipboard}
              >
                git clone{" "}
                <span className="text-green-400">{config.githubUrl}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hover:scale-105 transition-transform duration-300">
          <Image
            // onClick={gotoGithub}
            onClick={openImage}
            height={350}
            width={350}
            className="rounded-2xl cursor-pointer shadow-xl"
            src={IMGH}
            alt="GitHub Repository Preview"
            priority
          />
        </div>
      </div>

      <h1 className="text-center text-3xl text-[#918274] px-4">
        {config.description}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8 mb-12 px-4">
        <button
          onClick={downloadRepo}
          title="Download"
          disabled={isDownloading}
          className={`relative bg-gradient-to-r w-1/2 cursor-pointer from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] overflow-hidden group ${
            isDownloading ? "opacity-75" : ""
          }`}
        >
          <span className="relative z-10 flex items-center justify-center">
            {isDownloading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    d="M4 12a8 8 0 018-8"
                  />
                </svg>
                Downloading...
              </>
            ) : (
              `Download ${config.bscName}`
            )}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink-700 to-red-700 opacity-0 group-active:opacity-50 transition-opacity duration-200 ease-in-out animate-pulse" />
          <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 group-active:scale-150 rounded-2xl transition-all duration-500 ease-out pointer-events-none" />
        </button>
        <button title="SupportDiscord" className="bg-[#3d3b3b] w-1/2 cursor-pointer hover:bg-[#363636] text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] border border-gray-600">
          <a href={config.discord} target="_blank" rel="noopener noreferrer">
            Join our Support Server
          </a>
        </button>
        <button
          onClick={gotoGithub}
          title="View On Github"
          className="bg-gradient-to-r cursor-pointer w-1/2 from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        >
          View on GitHub
        </button>
      </div>

      {showReadme && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1D2021] text-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={readmeToggle}
              title="Close README"
              className="absolute top-2 cursor-pointer right-2 px-2 py-2 bg-gray-800 text-red-500 hover:text-red-700"
            >
              <CgClose />
            </button>
            <h2 className="text-2xl font-bold mb-4 font-bungee-tint ">README | {config.bscName}</h2>
            {readmeContent ? (
              <ReactMarkdown>{readmeContent}</ReactMarkdown>
            ) : (
              <p>Loading README...</p>
            )}
          </div>
        </div>
      )}
      {showPicture ? (
        <>
         <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-[#1D2021] text-white p-6 rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
             onClick={openImage}
             title="Close Picture"
             className="absolute rounded-lg top-2 cursor-pointer right-2 px-2 py-2 bg-gray-800 text-red-500 hover:text-red-700">
                <CgClose />
             </button>
            <Image src={IMGH} alt="IMAGE" />
          </div>
         </div>
        </>
      ) : (
        <>
         
        </>
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Center;