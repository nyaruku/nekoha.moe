import { useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import ytdlpLogo from "./images/ytdlp-logo.png";

function YTDLP() {
  const [url, setUrl] = useState("");
  const [videoFormats, setVideoFormats] = useState([]);
  const [audioFormats, setAudioFormats] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [fetchState, setFetchState] = useState("fetch"); // "fetch" or "download"
  const [videoInfo, setVideoInfo] = useState(null);

  const fetchInfo = async () => {
    if (!url) return;
    setFetchState("loading");

    try {
      const response = await axios.get(`/api/ytdlp/info?url=${encodeURIComponent(url)}`);
      const data = response.data;

      setVideoInfo(data.videoInfo);
      setVideoFormats(data.videoFormats);
      setAudioFormats(data.audioFormats);
      setFetchState("download");
    } catch (error) {
      console.error("Error fetching video info:", error);
      setFetchState("fetch");
    }
  };

  const downloadVideo = async () => {
    if (!url) return;
    const video = selectedVideo || 0;
    const audio = selectedAudio || 0;
    window.location.href = `/api/ytdlp/download?url=${encodeURIComponent(url)}&video=${video}&audio=${audio}`;
  };

  return (
    <>
      <Helmet>
        <title>YT-DLP</title>
      </Helmet>

      <div className="container py-4">
        <div className="text-center">
          <img src={ytdlpLogo} className="img-fluid" alt="YT-DLP" />
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Enter video URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setFetchState("fetch"); // Reset button state when URL changes
              }}
            />
          </div>

          <div className="col-12 mt-3">
            <button
              className="btn btn-primary w-100"
              onClick={fetchState === "fetch" ? fetchInfo : downloadVideo}
              disabled={fetchState === "loading"}
            >
              {fetchState === "loading" ? "Fetching..." : fetchState === "fetch" ? "Fetch Info" : "Download"}
            </button>
          </div>

          {fetchState === "download" && (
            <>
              <div className="col-md-6 col-12 mt-3">
                <select
                  className="form-select"
                  value={selectedVideo}
                  onChange={(e) => setSelectedVideo(e.target.value)}
                >
                  <option value="">(No Video)</option>
                  {videoFormats.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 col-12 mt-3">
                <select
                  className="form-select"
                  value={selectedAudio}
                  onChange={(e) => setSelectedAudio(e.target.value)}
                >
                  <option value="">(No Audio)</option>
                  {audioFormats.map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default YTDLP;
