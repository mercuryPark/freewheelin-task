// * components
import EditDetailsLayout from "./editDetails/Layout";
import SimilerQuestionLayout from "./similerQuestion/Layout";

// * hooks
import useProblems from "./hooks/useProblems";

const WorkBookLayout = () => {
    const { state, actions } = useProblems();

    return (
        <div className='flex gap-4 h-screen p-4 justify-center items-center'>
            {/* 유사 문항 */}
            <SimilerQuestionLayout problems={state.similarProblems} />
            {/* 학습지 상세 편집 */}
            <EditDetailsLayout
                problems={state.problems}
                selectedId={state.selectedProblemId}
                onChangeProblem={actions.changeSelectedProblem}
            />
        </div>
    );
};

export default WorkBookLayout;
