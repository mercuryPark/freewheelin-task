// * install libraries
import React, { useMemo, useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

// * utils
import { cn } from "@/utils/cn";

// * types
interface VirtualScrollerProps<T = unknown> {
    data: T[];
    itemContent: (item: T, index: number) => React.ReactNode;
    totalCount?: number;
    threshold?: number; // 가상 스크롤링 사용 기준 개수 (기본값: 100)
    onScroll?: (index: number) => void;
    onEndReached?: () => void;
    className?: string | undefined;
    style?: React.CSSProperties;
    height?: string | number;
    overscan?: number; // 가상 스크롤링 시 렌더링할 추가 아이템 개수
}

// * component
const VirtualScroller = <T,>({
    data,
    itemContent,
    totalCount,
    threshold = 100,
    onScroll,
    onEndReached,
    className,
    style,
    height = "100%",
    overscan = 5,
}: VirtualScrollerProps<T>) => {
    // 가상 스크롤링 사용 여부 결정
    const shouldUseVirtualScrolling = useMemo(() => {
        const itemCount = totalCount ?? data.length;
        return itemCount > threshold;
    }, [data.length, totalCount, threshold]);

    // 스크롤 핸들러
    const handleScroll = useCallback(
        (index: number) => {
            onScroll?.(index);
        },
        [onScroll]
    );

    // 끝에 도달했을 때 핸들러
    const handleEndReached = useCallback(() => {
        onEndReached?.();
    }, [onEndReached]);

    // 일반 리스트 렌더링 (threshold 이하일 때)
    const renderNormalList = () => (
        <div
            className={cn(className || "", "overflow-y-auto")}
            onScroll={(e: React.UIEvent<HTMLDivElement>) => {
                const target = e.target as HTMLDivElement;
                const scrollTop = target.scrollTop;
                const itemHeight = target.scrollHeight / data.length;
                const currentIndex = Math.floor(scrollTop / itemHeight);
                handleScroll(currentIndex);
            }}
        >
            {data.map((item, index) => (
                <div key={index}>{itemContent(item, index)}</div>
            ))}
        </div>
    );

    // 가상 스크롤링 렌더링 (threshold 초과일 때)
    const renderVirtualList = () => (
        <Virtuoso
            data={data}
            itemContent={(index, item) => (
                <div className='mb-3'>
                    {/* gap 대신 margin 사용 */}
                    {itemContent(item, index)}
                </div>
            )}
            totalCount={data.length}
            overscan={overscan}
            onScroll={(e) => {
                if ("index" in e && typeof e.index === "number") {
                    handleScroll(e.index);
                }
            }}
            endReached={handleEndReached}
            className={className}
            style={{
                height,

                ...style,
            }}
        />
    );

    // 데이터가 없을 때
    if (!data || data.length === 0) {
        return (
            <div
                className={className}
                style={{
                    height,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    ...style,
                }}
            >
                <p>데이터가 없습니다.</p>
            </div>
        );
    }

    // 조건에 따라 렌더링 방식 선택
    return shouldUseVirtualScrolling ? renderVirtualList() : renderNormalList();
};

export default VirtualScroller;
