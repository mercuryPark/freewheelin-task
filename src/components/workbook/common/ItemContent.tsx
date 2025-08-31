// * types
import { Problem } from "../types";

// * components
import Image from "@/components/common/Image";
import LevelBadge from "@/components/workbook/common/LevelBadge";

// * utils
import { cn } from "@/utils/cn";

const ItemContent = ({
    item,
    number,
    active,
    buttons,
}: {
    item: Problem;
    number: number;
    active?: boolean;
    buttons?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "bg-white rounded-[12px] shadow-sm border-[3px] ",
                active ? " border-[#00ABFF]" : "border-[#FAFAFA]"
            )}
        >
            {/* 문제의 header 영역 */}
            <header className='flex items-center justify-between bg-[#FAFAFA] px-6 py-3 rounded-t-[12px]'>
                <div className='flex items-center gap-6 truncate'>
                    <h1 className='text-black text-[20px] font-[700]'>
                        {number + 1}
                    </h1>
                    <h1 className='text-[14px] truncate'>{item.title}</h1>
                </div>

                {/* buttons */}
                {buttons && buttons}
            </header>

            {/* 문제의 content 영역 */}
            <div className='flex gap-6  px-5 pt-3'>
                {/* 문제 tag */}
                <div className='flex flex-col gap-2 flex-none'>
                    {/* // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상) */}
                    <LevelBadge level={item.level} />

                    <div className='text-[11px] font-[400] bg-[#F5F5F5] text-[#959595] px-1 py-0.5 rounded-[6px] flex items-center justify-center'>
                        {item.answerRate}%
                    </div>

                    <div className='text-[11px] font-[400] bg-[#F5F5F5] text-[#959595] px-1 py-0.5 rounded-[6px] flex items-center justify-center'>
                        {item.type === 1 ? "객관식" : "주관식"}
                    </div>
                </div>

                {/* 문제 이미지 */}
                <div className='px-2 pt-2 pb-10 w-full'>
                    <Image
                        src={item.problemImageUrl}
                        alt={item.title}
                        width={100}
                        height={100}
                        className='object-contain w-full'
                    />
                </div>
            </div>
        </div>
    );
};

export default ItemContent;
