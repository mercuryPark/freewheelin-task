// * types
import { Problem } from "../types";

// * components
import ItemContent from "./ItemContent";
import VirtualScroller from "@/components/common/VirtualScroller";

const SimilerQuestionLayout = ({ problems }: { problems: Problem[] }) => {
    // 선택된 문제 없음
    if (!problems || problems.length === 0) {
        return (
            <div className='w-[504px] h-full bg-[#E8E8E8] rounded-[12px] flex flex-col gap-1 items-center justify-center text-black text-[12px] font-[400]'>
                <p className='flex items-center'>
                    <span className='mr-2 mb-0.5 inline bg-white px-1.5 py-1 rounded-[4px] text-[9px] text-[#959595] border-[0.6px] border-[#E0E0E0]'>
                        유사문제
                    </span>
                    버튼을 누르면
                </p>
                <p>문제를 추가 또는 교체할수 있습니다.</p>
            </div>
        );
    }

    return (
        <div className='w-[504px] h-full bg-[#E8E8E8] rounded-[12px] p-4  flex flex-col justify-between overflow-hidden'>
            <h1 className='text-black text-[16px] font-[700] mb-4 flex-shrink-0'>
                유사 문항
            </h1>

            {/* 문제 리스트 */}
            <VirtualScroller
                data={problems || []}
                className='flex flex-col gap-2 flex-1 min-h-0 mb-4'
                itemContent={(problem: Problem, index: number) => (
                    <ItemContent item={problem} index={index} />
                )}
            />
        </div>
    );
};

export default SimilerQuestionLayout;
