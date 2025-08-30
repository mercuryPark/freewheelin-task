// * basic
import { useState } from "react";

// * install libraries
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";

// * services
import { API_GET_PROBLEMS, API_GET_SIMILAR_PROBLEMS } from "@/service/problems";
import { Problem } from "../types";

const useProblems = () => {
    const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
        null
    );

    // 문제 리스트 조회
    const { data: problems } = useQuery({
        queryKey: ["problems"],
        queryFn: API_GET_PROBLEMS,
        retry: false,
    });

    // 유사 문제 리스트 조회
    const { data: similarProblems } = useQuery({
        queryKey: ["similarProblems", selectedProblemId],
        queryFn: ({ queryKey }: { queryKey: (string | null)[] }) =>
            API_GET_SIMILAR_PROBLEMS(queryKey[1] as string, {
                excludedProblemIds: problems
                    ?.map((problem: Problem) => problem.id)
                    .join(","),
            }),
        enabled: !!selectedProblemId, // selectedProblemId가 truthy일 때만 실행
        retry: false,
        placeholderData: (previousData) => previousData, // 이전 데이터 유지
    });

    // 선택된 문제 변경
    const handleSelectProblem = (problemId: string) => {
        setSelectedProblemId(problemId);
    };

    return {
        state: {
            problems,
            similarProblems,
            selectedProblemId,
        },

        actions: {
            changeSelectedProblem: handleSelectProblem,
        },
    };
};

export default useProblems;
