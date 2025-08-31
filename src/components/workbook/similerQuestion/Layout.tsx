// * types
import { Problem } from "../types";

// * components
import ItemContent from "@/components/workbook/common/ItemContent";
import VirtualScroller from "@/components/common/VirtualScroller";
import Icon from "@/components/common/Icon";

const SimilerQuestionLayout = ({
    problems,
    addProblem,
    replaceProblem,
}: {
    problems: Problem[];
    addProblem: (sp_id: string) => void;
    replaceProblem: (sp_id: string) => void;
}) => {
    // 선택된 문제 없음
    if (!problems || problems.length === 0) {
        return (
            <div className='min-w-[300px] xl:w-[504px] lg:max-xl:w-full h-full bg-[#E8E8E8] rounded-[12px] flex flex-col items-center justify-center text-black text-[12px] font-[400]'>
                <p className='flex items-center'>
                    <span className='mr-1 mb-0.5 inline bg-white px-1.5 py-1 rounded-[4px] text-[9px] text-[#959595] border-[0.6px] border-[#E0E0E0]'>
                        유사문제
                    </span>
                    버튼을 누르면 <br />
                </p>
                <p>문제를 추가 또는 교체할수 있습니다.</p>
            </div>
        );
    }

    return (
        <div className='xl:w-[504px] lg:max-xl:w-full h-full bg-[#E8E8E8] rounded-[12px] p-4  flex flex-col justify-between overflow-hidden'>
            {/* title */}
            <h1 className='text-black text-[16px] font-[700] mb-4 flex-shrink-0'>
                유사 문항
            </h1>

            {/* 문제 리스트 */}
            <VirtualScroller
                data={problems || []}
                className='flex flex-col gap-3 flex-1 min-h-0 mb-4'
                itemContent={(problem: Problem, index: number) => (
                    <ItemContent
                        item={problem}
                        number={index}
                        buttons={
                            <div className='flex flex-none items-center gap-3 text-[12px] text-[#959595]'>
                                <button
                                    className='flex items-center gap-1 cursor-pointer'
                                    onClick={() => replaceProblem(problem.id)}
                                >
                                    <Icon type='swapHorizon' />
                                    교체
                                </button>
                                <button
                                    className='flex items-center gap-1 cursor-pointer'
                                    onClick={() => addProblem(problem.id)}
                                >
                                    <Icon type='addCircle' />
                                    추가
                                </button>
                            </div>
                        }
                    />
                )}
            />
        </div>
    );
};

export default SimilerQuestionLayout;
