import React, { useState, useCallback } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "@/utils/cn";

// * types
interface ImageProps extends Omit<NextImageProps, "onError"> {
    fallbackSrc?: string; // 기본 이미지 경로
    fallbackComponent?: React.ReactNode; // 기본 이미지 컴포넌트
    onError?: (error: string) => void; // 에러 핸들러
    showFallbackOnError?: boolean; // 에러 시 기본 이미지 표시 여부
}

// * component
const Image = ({
    src,
    alt,
    fallbackSrc = "/images/default-image.png", // 기본 이미지 경로
    fallbackComponent,
    onError,
    showFallbackOnError = true,
    className,
    style,
    ...props
}: ImageProps) => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 에러 핸들러
    const handleError = useCallback(() => {
        setIsError(true);
        setIsLoading(false);
        onError?.(`Failed to load image: ${src}`);
    }, [src, onError]);

    // 로드 성공 핸들러
    const handleLoad = useCallback(() => {
        setIsLoading(false);
        setIsError(false);
    }, []);

    // 에러 상태이고 기본 이미지 컴포넌트가 있는 경우
    if (isError && fallbackComponent) {
        return <>{fallbackComponent}</>;
    }

    // 에러 상태이고 기본 이미지 경로가 있는 경우
    if (isError && showFallbackOnError && fallbackSrc) {
        return (
            <NextImage
                src={fallbackSrc}
                alt={`${alt} (기본 이미지)`}
                className={className}
                style={style}
                onError={() => {
                    // 기본 이미지도 로드 실패 시 빈 div 반환
                    console.warn(
                        `Fallback image also failed to load: ${fallbackSrc}`
                    );
                }}
                {...props}
            />
        );
    }

    // 에러 상태이고 기본 이미지가 없는 경우
    if (isError && !showFallbackOnError) {
        return (
            <div
                className={className}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                    color: "#999",
                    fontSize: "14px",
                    ...style,
                }}
            >
                이미지를 불러올 수 없습니다
            </div>
        );
    }

    // 정상 이미지 렌더링
    return (
        <NextImage
            src={src}
            alt={alt}
            className={className}
            style={style}
            onError={handleError}
            onLoad={handleLoad}
            {...props}
        />
    );
};

export default Image;
