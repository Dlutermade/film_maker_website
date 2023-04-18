import { AspectRatio } from "@chakra-ui/react";
import { useCallback, useMemo, useRef } from "react";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import useResizeObserver from "./hooks/useResizeObserver";

const MINIMUM_PLAY_WIDTH = 720;

const EffectiveVideoBlock = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const intersectionRatioHandlerList: [number, Function][] = useMemo(
    () => [
      [
        0.3,
        () =>
          videoRef.current &&
          videoRef.current.clientWidth >= MINIMUM_PLAY_WIDTH &&
          videoRef.current.play(),
      ],
      [0, () => videoRef.current?.pause()],
    ],
    []
  );

  const notIntersectionHandler = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const { isIntersecting, intersectionRatio } = useIntersectionObserver(
    videoRef,
    intersectionRatioHandlerList,
    notIntersectionHandler
  );

  const ResizeHandler = useCallback(() => {
    if (
      videoRef.current &&
      videoRef.current.clientWidth <= MINIMUM_PLAY_WIDTH
    ) {
      videoRef.current.pause();
    } else if (
      isIntersecting &&
      intersectionRatio >= intersectionRatioHandlerList[0][0]
    ) {
      videoRef.current?.play();
    }
  }, [intersectionRatio, intersectionRatioHandlerList, isIntersecting]);

  useResizeObserver(videoRef, ResizeHandler);

  return (
    <AspectRatio ratio={16 / 9} maxW="100vw">
      <video ref={videoRef} muted src="./video/sample.mp4" />
    </AspectRatio>
  );
};

export default EffectiveVideoBlock;
