// * basic
import { useEffect, useState } from "react";

// * install libraries
import { useQuery, useQueryClient } from "@tanstack/react-query";
import _ from "lodash";

// * services
import { API_GET_PROBLEMS, API_GET_SIMILAR_PROBLEMS } from "@/service/problems";

// * types
import { Problem } from "../types";

const useProblems = () => {
    const queryClient = useQueryClient();

    // 유사문제를 선택한 문제 id
    const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
        null
    );

    // 요청용 id
    const [fetchTargetId, setFetchTargetId] = useState<string | null>(null);

    const [summary, setSummary] = useState<{
        levels: string;
        count: number;
    } | null>(null);

    // 문제 리스트 조회
    const { data: problems } = useQuery({
        queryKey: ["problems"],
        queryFn: API_GET_PROBLEMS,
        retry: false,
        refetchOnWindowFocus: false, // focus 시 요청 비활성화
        placeholderData: (previousData) => previousData, // 이전 데이터 유지
    });

    // 유사 문제 리스트 조회
    const { data: similarProblems } = useQuery({
        queryKey: ["similarProblems", fetchTargetId],
        queryFn: ({ queryKey }: { queryKey: (string | null)[] }) =>
            API_GET_SIMILAR_PROBLEMS(queryKey[1] as string, {
                excludedProblemIds: problems
                    ?.map((problem: Problem) => problem.id)
                    .filter((id: string) => id !== selectedProblemId)
                    .join(","),
            }),
        enabled: !!fetchTargetId, // selectedProblemId가 truthy일 때만 실행
        retry: false,
        refetchOnWindowFocus: false, // focus 시 요청 비활성화
        placeholderData: (previousData) => previousData, // 이전 데이터 유지
    });

    // 선택된 문제 변경
    const handleSelectProblem = (problemId: string) => {
        setSelectedProblemId(problemId);
        setFetchTargetId(problemId);
    };

    // 유사문제를 문제리스트에 추가
    const handleAddProblem = (sProblemId: string) => {
        // 추가할 유사문제
        const findSimilarProblem = _.find(
            similarProblems,
            (problem: Problem) => problem.id === sProblemId
        );

        // 추가할 유사문제가 없거나 선택된 문제가 없는경우
        if (!findSimilarProblem || !selectedProblemId) {
            return;
        }

        // 유사문제리스트에서 제거
        queryClient.setQueryData(
            ["similarProblems", selectedProblemId],
            (prev: Problem[]) => {
                return _.filter(
                    prev,
                    (problem: Problem) => problem.id !== sProblemId
                );
            }
        );

        // 현재 선택된 문제에 유사문제 추가
        queryClient.setQueryData(["problems"], (prev: Problem[]) => {
            return _.flatMap(prev, (problem: Problem) =>
                problem.id === selectedProblemId
                    ? [problem, findSimilarProblem as Problem]
                    : [problem]
            );
        });
    };

    // 유사문제를 선택한 문제와 교체
    const handleReplaceProblem = (sProblemId: string) => {
        // 교체할 유사문제
        const findSimilarProblem: Problem | undefined = _.find(
            similarProblems,
            (problem: Problem) => problem.id === sProblemId
        );

        // 교체할 문제
        const findProblem: Problem | undefined = _.find(
            problems,
            (problem: Problem) => problem.id === selectedProblemId
        );

        // 추가할 유사문제가 없거나 선택된 문제가 없는경우
        if (!findSimilarProblem || !selectedProblemId || !findProblem) {
            return;
        }

        // 유사문제리스트에 active된 문제로 교체
        queryClient.setQueryData(
            ["similarProblems", fetchTargetId],
            (prev: Problem[]) => {
                return _.map(prev, (s_problem: Problem) => {
                    return s_problem.id === sProblemId
                        ? findProblem
                        : s_problem;
                });
            }
        );
        setSelectedProblemId(sProblemId);

        // active된 문제를 유사문제로 교체
        queryClient.setQueryData(["problems"], (prev: Problem[]) => {
            return _.map(prev, (problem: Problem) => {
                return problem.id === selectedProblemId
                    ? findSimilarProblem
                    : problem;
            });
        });
    };

    // 문제리스트 문제 삭제하기
    const handleDeleteProblem = (problemId: string) => {
        // 삭제할 문제가 선택된 문제인 경우
        if (problemId === selectedProblemId) {
            setSelectedProblemId(null);
            queryClient.setQueryData(["similarProblems", fetchTargetId], () => {
                return [];
            });
        }

        // 문제리스트에서 삭제
        queryClient.setQueryData(["problems"], (prev: Problem[]) => {
            return _.filter(
                prev,
                (problem: Problem) => problem.id !== problemId
            );
        });
    };

    // 문제리스트 요약
    const summaryProblems = (problems: Problem[]) => {
        const levelMap = {
            1: "하",
            2: "중하",
            3: "중",
            4: "상",
            5: "최상",
        };

        // level별 개수 세기
        const grouped = _.countBy(problems, "level");

        // 레벨 순서대로 문자열 만들기
        const levelOrder = [1, 2, 3, 4, 5];
        const levels = levelOrder
            .map(
                (lvl) =>
                    `${levelMap[lvl as keyof typeof levelMap]}${
                        grouped[lvl] ?? 0
                    }`
            )
            .join(" · ");

        console.log({
            levels: levels,
            count: problems?.length ?? 0,
        });
        setSummary({
            levels: levels,
            count: problems?.length ?? 0,
        });
    };

    useEffect(() => {
        // 문제 리스트 변경시 요약 업데이트
        summaryProblems(problems);
    }, [problems]);

    return {
        state: {
            // 문제리스트 요약
            summary,
            // 문제리스트
            problems,
            // 유사문제리스트
            similarProblems,
            // 선택된 문제 id
            selectedProblemId,
        },

        actions: {
            // 선택된 문제 아래에 유사문제 추가
            addProblem: handleAddProblem,
            // 유사문제와 선택된 문제 교체
            replaceProblem: handleReplaceProblem,
            // 문제 삭제
            deleteProblem: handleDeleteProblem,
            // 선택된 문제 변경
            changeSelectedProblem: handleSelectProblem,
        },
    };
};

export default useProblems;
