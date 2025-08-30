// * types
import { Problem } from "../types";

// * components
import Image from "@/components/common/Image";
import Icon from "@/components/common/Icon";

const ItemContent = ({
    item,
    index,
    addProblem,
    replaceProblem,
}: {
    item: Problem;
    index: number;
    addProblem: (sp_id: string) => void;
    replaceProblem: (sp_id: string) => void;
}) => {
    return (
        <div className='bg-white rounded-[12px] shadow-md'>
            {/* 문제의 header 영역 */}
            <header className='flex items-center justify-between bg-[#FAFAFA]  px-6 py-3 rounded-[12px]'>
                <div className='flex items-center gap-6 truncate'>
                    <h1 className='text-black text-[20px] font-[700]'>
                        {index + 1}
                    </h1>
                    <h1 className='text-[14px] truncate'>{item.title}</h1>
                </div>

                {/* buttons */}
                <div className='flex flex-none items-center gap-2 text-[12px] text-[#959595]'>
                    <button
                        className='flex items-center gap-1 cursor-pointer'
                        onClick={() => replaceProblem(item.id)}
                    >
                        <Icon type='swapHorizon' />
                        교체
                    </button>
                    <button
                        className='flex items-center gap-1 cursor-pointer'
                        onClick={() => addProblem(item.id)}
                    >
                        <Icon type='addCircle' />
                        추가
                    </button>
                </div>
            </header>

            {/* 문제의 content 영역 */}
            <div className='flex gap-6  px-5 pt-3'>
                {/* 문제 tag */}
                <div className='flex flex-col gap-2 flex-none'>
                    <div className='text-[11px] font-[400] bg-[#F5F5F5] text-[#959595] px-1 py-0.5 rounded-[6px] flex items-center justify-center'>
                        {/* // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상) */}
                        {item.level === 1 && "하"}
                        {item.level === 2 && "중하"}
                        {item.level === 3 && "중"}
                        {item.level === 4 && "상"}
                        {item.level === 5 && "최상"}
                    </div>

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
