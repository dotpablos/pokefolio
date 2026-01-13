"use client";
import { useEffect, useState } from "react";
import { selectInfoContent } from "../data/InfoRegistry";
import { LinkButton } from "./Buttons";
import { CardID } from "../data/InfoRegistry";

const Divider = () => (
  <div className="border-[#333333] rounded-lg border-[0.5px]" />
);

interface ContentCardProps {
  selectedCardId: CardID;
}

export default function ContentCard({ selectedCardId }: ContentCardProps) {
  const {
    title,
    subtitle,
    description,
    description2,
    workDetails,
    links,
    imagePathDir,
  } = selectInfoContent(selectedCardId);

  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTitleComplete, setIsTitleComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setIsFadingOut(true);
    setShowContent(false);
    setShowImage(false);
    setShowButtons(false);
    setDisplayedTitle("");

    const resetTimeout = setTimeout(() => {
      setIsTitleComplete(false);
      setIsFadingOut(false);
    }, 150);

    return () => clearTimeout(resetTimeout);
  }, [selectedCardId]);

  // Typewriter effect for title
  useEffect(() => {
    if (!title || displayedTitle === title) {
      setIsTitleComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedTitle(title.slice(0, displayedTitle.length + 1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [title, displayedTitle]);

  // Fade in content after title is complete
  useEffect(() => {
    if (isTitleComplete) {
      const timeout = setTimeout(() => {
        setShowContent(true);
      }, 200); // Small delay after title completes
      return () => clearTimeout(timeout);
    }
  }, [isTitleComplete]);

  // Memoize image fetching with caching
  useEffect(() => {
    if (!imagePathDir) {
      setImageFiles([]);
      return;
    }

    // Simple cache to avoid refetching
    const cacheKey = `images_${imagePathDir}`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      try {
        setImageFiles(JSON.parse(cached));
        return;
      } catch (e) {
        // Invalid cache, fetch fresh
      }
    }

    let cancelled = false;
    fetch(`/api/files?directory=media/${imagePathDir}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.files && Array.isArray(data.files)) {
          setImageFiles(data.files);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.files));
        } else {
          console.warn("No files found or invalid response:", data);
          setImageFiles([]);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("Error fetching files:", err);
        setImageFiles([]);
      });

    return () => {
      cancelled = true;
    };
  }, [imagePathDir]);

  const currentImage = imageFiles.length > 0 ? imageFiles[0] : null;

  // Start image reveal animation after title completes
  useEffect(() => {
    if (isTitleComplete && currentImage) {
      const timeout = setTimeout(() => {
        setShowImage(true);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isTitleComplete, currentImage]);

  // Fade in buttons after image reveal completes
  useEffect(() => {
    if (showImage) {
      const timeout = setTimeout(() => {
        setShowButtons(true);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [showImage]);

  return (
    <div className="box p-8 w-[80vw] h-full">
      <div className="flex lg:flex-row flex-col items-start gap-8 lg:justify-center align-start">
        {currentImage ? (
          <div className="shrink-0 w-72 max-w-96">
            <div
              className={`image-reveal ${showImage ? "revealed" : ""} ${
                isFadingOut ? "fade-out" : ""
              }`}
            >
              <img
                alt={title}
                width={300}
                height={300}
                className="photo-container w-full h-auto"
                src={currentImage}
              />
            </div>
          </div>
        ) : (
          <div className="shrink-0 w-96 max-w-96">
            <div className="photo-container" />
          </div>
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-0 text-wrap">
          <h1 className={`title ${isFadingOut ? "fade-out" : ""}`}>
            {displayedTitle}
            {!isTitleComplete && displayedTitle && (
              <span className="animate-blink">|</span>
            )}
          </h1>
          <div
            className={`content-fade-in ${showContent ? "visible" : ""} ${
              isFadingOut ? "fade-out" : ""
            }`}
          >
            {subtitle && <p className="subtitle mb-3">{subtitle}</p>}
            <Divider />
            <p className="description">{description}</p>
            <p className="description">{description2}</p>
            {workDetails && (
              <>
                <Divider />
                <div className="flex flex-col gap-2 py-4">
                  {workDetails.detail1 &&
                    Object.entries(workDetails).map(([key, value]) => (
                      <div className="flex flex-row gap-4" key={key}>
                        <p className="subtitle w-1/3 max-w-50 shrink-0">
                          {value.type}
                        </p>
                        <span className="subtitle text-white!">
                          {value.detail}
                        </span>
                      </div>
                    ))}
                </div>
              </>
            )}
            <div
              className={`grid grid-cols-2 gap-2 buttons-fade-in sm:flex sm:flex-row ${
                showButtons ? "visible" : ""
              } ${isFadingOut ? "fade-out" : ""}`}
            >
              {links &&
                links.map((link) => (
                  <LinkButton
                    key={link.name}
                    name={link.name}
                    icon={link.icon}
                    url={link.url}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
