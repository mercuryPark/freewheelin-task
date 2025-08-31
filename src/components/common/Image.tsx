// * basic
import React, { useState, useCallback } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

// * types
interface ImageProps extends Omit<NextImageProps, "onError"> {
    fallbackSrc?: string | null; // 기본 이미지 경로
    fallbackComponent?: React.ReactNode; // 기본 이미지 컴포넌트
    onError?: (error: string) => void; // 에러 핸들러
    showFallbackOnError?: boolean; // 에러 시 기본 이미지 표시 여부
}

const Image = ({
    src,
    alt,
    fallbackSrc = null as string | null, // 기본 이미지 경로
    fallbackComponent,
    onError,
    // 보여줄 기본이미지가 있으면 true, 없으면 false
    showFallbackOnError = false,
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
        <NextImage
            src={fallbackSrc}
            alt={`${alt} (기본 이미지)`}
            className={className}
            style={style}
            onError={() => {}}
            {...props}
        />;
    }

    // 에러 상태이고 기본 이미지가 없는 경우
    if (isError && !showFallbackOnError) {
        return (
            <div className='h-64 w-full flex items-center justify-center ring-1 ring-[#eeeeee] shadow-md rounded-[4px]'>
                <h1 className='text-[#999] text-[12px] font-[400]'>
                    이미지를 불러오지 못했습니다.
                </h1>
            </div>
        );
    }

    // 정상 이미지 렌더링
    return (
        <NextImage
            src={src}
            alt={alt}
            quality={100}
            unoptimized={true} // Next.js 최적화 비활성화 (원본 화질)
            className={className}
            style={style}
            onError={handleError}
            onLoad={handleLoad}
            {...props}
        />
    );
};

export default Image;
