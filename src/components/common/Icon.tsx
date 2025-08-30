import Image from "next/image";
import { cn } from "@/utils/cn";

// * icons
import * as icons from "@/components/icon";

// 아이콘 타입을 자동으로 생성
type IconType = keyof typeof icons;

// 아이콘 맵을 자동으로 생성
const iconMap: Record<IconType, string> = icons as Record<IconType, string>;

interface IconProps {
    type: IconType;
    w?: number;
    h?: number;
    className?: string;
    isOriginal?: boolean;
}

const Icon = ({ type, w, h, className, isOriginal }: IconProps) => {
    const currentIcon = iconMap[type];

    if (!currentIcon) {
        console.warn(`Icon type "${type}" not found`);
        return null;
    }

    return (
        <Image
            alt={`${type} icon`}
            className={cn(!isOriginal && `w-${w || 5} h-${h || 5}`, className)}
            unoptimized={true}
            src={currentIcon}
            width={0}
            height={0}
            style={{ width: "auto", height: "auto" }}
        />
    );
};

export default Icon;
