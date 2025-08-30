// * types
import { Problem } from "../types";

// * components
import VirtualScroller from "@/components/common/VirtualScroller";
import EditDetailsFooter from "./Footer";
import ItemContent from "./ItemContent";

const EditDetailsLayout = ({
    problems,
    selectedId,
    onChangeProblem,
}: {
    problems: Problem[];
    selectedId: string | null;
    onChangeProblem: (problemId: string) => void;
}) => {
    return (
        <div className='w-[712px] h-full bg-[#5C5C5C] rounded-[12px] p-4 flex flex-col justify-between overflow-hidden'>
            <div className='flex-1 flex flex-col min-h-0'>
                <h1 className='text-white text-[16px] font-[700] mb-4 flex-shrink-0'>
                    학습지 상세 편집
                </h1>

                {/* 문제 리스트 */}
                <VirtualScroller
                    data={problems || []}
                    className='flex flex-col gap-2 flex-1 min-h-0 mb-4'
                    itemContent={(problem: Problem, index: number) => (
                        <ItemContent
                            item={problem}
                            index={index}
                            active={selectedId === problem.id}
                            onChangeProblem={onChangeProblem}
                        />
                    )}
                />
            </div>
            <EditDetailsFooter />
        </div>
    );
};

export default EditDetailsLayout;
