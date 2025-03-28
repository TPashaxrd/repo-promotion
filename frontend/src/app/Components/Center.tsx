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
  };

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
            <h3 className="font-bold mb-2">How To Clone?</h3>
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
            onClick={gotoGithub}
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
          className="bg-gradient-to-r w-1/2 cursor-pointer from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        >
          Download {config.bscName}
        </button>
        <button className="bg-[#3d3b3b] w-1/2 cursor-pointer hover:bg-[#363636] text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px] border border-gray-600">
          <a href={config.discord} target="_blank" rel="noopener noreferrer">
            Join our Support Server
          </a>
        </button>
        <button
          onClick={gotoGithub}
          className="bg-gradient-to-r cursor-pointer w-1/2 from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        >
          View on GitHub
        </button>
      </div>

      <Toaster position="bottom-center" />
    </div>
  );
};

export default Center;
