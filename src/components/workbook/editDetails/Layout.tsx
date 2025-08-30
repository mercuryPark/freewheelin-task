// * types
import { Problem } from "../types";

// * components
import VirtualScroller from "@/components/common/VirtualScroller";
import EditDetailsFooter from "./Footer";
import ItemContent from "./ItemContent";

const EditDetailsLayout = ({
    summary,
    problems,
    selectedId,
    onChangeProblem,
    deleteProblem,
}: {
    summary: {
        levels: string;
        count: number;
    } | null;
    problems: Problem[];
    selectedId: string | null;
    onChangeProblem: (problemId: string) => void;
    deleteProblem: (problemId: string) => void;
}) => {
    return (
        <div className='w-[712px] h-full bg-[#5C5C5C] rounded-[12px] p-4 flex flex-col justify-between overflow-hidden'>
            <div className='flex-1 flex flex-col min-h-0'>
                <h1 className='text-white text-[16px] font-[700] mb-4 flex-shrink-0'>
                    학습지 상세 편집
                </h1>

                {problems && problems.length === 0 ? (
                    <div className='text-white text-[14px] font-[400] flex flex-col items-center justify-center flex-1'>
                        <p className='text-center'>
                            학습지 문제수가 없습니다. <br /> 다음단계로 넘어가기
                            위해 문제를 추가해주세요.
                        </p>
                    </div>
                ) : (
                    // 문제 리스트
                    <VirtualScroller
                        data={problems || []}
                        className='flex flex-col gap-4 flex-1 min-h-0 mb-4'
                        itemContent={(problem: Problem, index: number) => (
                            <ItemContent
                                item={problem}
                                index={index}
                                active={selectedId === problem.id}
                                onChangeProblem={onChangeProblem}
                                deleteProblem={deleteProblem}
                            />
                        )}
                    />
                )}
            </div>
            <EditDetailsFooter summary={summary} />
        </div>
    );
};

export default EditDetailsLayout;
