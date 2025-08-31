import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useProblems from "./useProblems";
import { API_GET_PROBLEMS, API_GET_SIMILAR_PROBLEMS } from "@/service/problems";
import React from "react";

// Mock API functions
jest.mock("@/service/problems", () => ({
    API_GET_PROBLEMS: jest.fn(),
    API_GET_SIMILAR_PROBLEMS: jest.fn(),
}));

// 문제 리스트(mock)
const mockProblems = [
    {
        id: "1",
        title: "문제 1",
        level: 1,
        type: 1,
        answerRate: 85,
        problemImageUrl: "http://example.com/image1.png",
    },
    {
        id: "2",
        title: "문제 2",
        level: 3,
        type: 2,
        answerRate: 72,
        problemImageUrl: "http://example.com/image2.png",
    },
    {
        id: "3",
        title: "문제 3",
        level: 5,
        type: 1,
        answerRate: 95,
        problemImageUrl: "http://example.com/image3.png",
    },
];

// 유사문제 리스트(mock)
const mockSimilarProblems = [
    {
        id: "4",
        title: "유사문제 1",
        level: 2,
        type: 1,
        answerRate: 78,
        problemImageUrl: "http://example.com/similar1.png",
    },
    {
        id: "5",
        title: "유사문제 2",
        level: 4,
        type: 2,
        answerRate: 88,
        problemImageUrl: "http://example.com/similar2.png",
    },
];

// Test wrapper component
const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return function TestWrapper(props: { children: ReactNode }) {
        return React.createElement(
            QueryClientProvider,
            { client: queryClient },
            props.children
        );
    };
};

// useProblems 훅 테스트
describe("useProblems", () => {
    let wrapper: ReturnType<typeof createWrapper>;

    beforeEach(() => {
        wrapper = createWrapper();
        jest.clearAllMocks();

        // API 응답 모킹
        (API_GET_PROBLEMS as jest.Mock).mockResolvedValue(mockProblems);
        (API_GET_SIMILAR_PROBLEMS as jest.Mock).mockResolvedValue(
            mockSimilarProblems
        );
    });

    describe("초기 상태", () => {
        it("초기 상태가 올바르게 설정되어야 한다", () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            expect(result.current.state.selectedProblemId).toBeNull();
            expect(result.current.state.problems).toBeUndefined();
            expect(result.current.state.similarProblems).toBeUndefined();
            expect(result.current.state.summary).toEqual({
                levels: "",
                count: 0,
            });
        });
    });

    describe("문제 리스트 조회", () => {
        it("문제 리스트를 성공적으로 조회해야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toEqual(mockProblems);
            });

            // API_GET_PROBLEMS가 1번 호출되어야 함
            expect(API_GET_PROBLEMS).toHaveBeenCalledTimes(1);
        });

        it("API 호출 실패 시 에러를 처리해야 한다", async () => {
            // API_GET_PROBLEMS 모킹 실패
            (API_GET_PROBLEMS as jest.Mock).mockRejectedValue(
                new Error("API Error")
            );

            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeUndefined();
            });
        });
    });

    describe("문제 선택", () => {
        it("문제를 선택하면 selectedProblemId가 변경되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            expect(result.current.state.selectedProblemId).toBe("1");
        });

        it("문제 선택 시 유사문제 API가 호출되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            await waitFor(() => {
                expect(API_GET_SIMILAR_PROBLEMS).toHaveBeenCalledWith("1", {
                    excludedProblemIds: "1,2,3",
                });
            });
        });
    });

    describe("유사문제 추가", () => {
        it("유사문제를 문제 리스트에 추가해야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.similarProblems).toBeDefined();
            });

            act(() => {
                result.current.actions.addProblem("4");
            });

            await waitFor(() => {
                expect(result.current.state.problems).toHaveLength(4);
            });
            expect(result.current.state.problems?.[1]).toEqual(
                mockSimilarProblems[0]
            );
        });

        it("선택된 문제가 없으면 추가되지 않아야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            const initialLength = result.current.state.problems?.length || 0;

            act(() => {
                result.current.actions.addProblem("4");
            });

            expect(result.current.state.problems).toHaveLength(initialLength);
        });
    });

    describe("문제 교체", () => {
        it("유사문제와 선택된 문제를 교체해야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.similarProblems).toBeDefined();
            });

            act(() => {
                result.current.actions.replaceProblem("4");
            });

            // 선택된 문제가 변경되어야 함
            expect(result.current.state.selectedProblemId).toBe("4");

            // 문제 리스트에서 교체되어야 함
            expect(result.current.state.problems?.[0]).toEqual(
                mockSimilarProblems[0]
            );
        });

        it("교체 후 유사문제 리스트가 업데이트되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.similarProblems).toBeDefined();
            });

            act(() => {
                result.current.actions.replaceProblem("4");
            });

            // 유사문제 리스트에서 교체된 문제가 있어야 함
            expect(result.current.state.similarProblems).toContainEqual(
                mockProblems[0]
            );
        });
    });

    describe("문제 삭제", () => {
        it("문제를 삭제해야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            const initialLength = result.current.state.problems?.length || 0;

            act(() => {
                result.current.actions.deleteProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.problems).toHaveLength(
                    initialLength - 1
                );
            });
            expect(
                result.current.state.problems?.find(
                    (p: { id: string }) => p.id === "1"
                )
            ).toBeUndefined();
        });

        it("선택된 문제를 삭제하면 selectedProblemId가 null이 되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            act(() => {
                result.current.actions.deleteProblem("1");
            });

            expect(result.current.state.selectedProblemId).toBeNull();
            // similarProblems가 빈 배열이 되어야 함
            expect(result.current.state.similarProblems).toEqual([]);
        });
    });

    describe("요약 정보", () => {
        it("문제 리스트 변경 시 요약이 업데이트되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            expect(result.current.state.summary).toEqual({
                levels: "하1 · 중1 · 최상1",
                count: 3,
            });
        });

        it("문제 삭제 시 요약이 업데이트되어야 한다", async () => {
            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.deleteProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.summary).toEqual({
                    levels: "중1 · 최상1",
                    count: 2,
                });
            });
        });
    });

    describe("에러 처리", () => {
        it("유사문제 API 호출 실패 시 에러를 처리해야 한다", async () => {
            (API_GET_SIMILAR_PROBLEMS as jest.Mock).mockRejectedValue(
                new Error("Similar API Error")
            );

            const { result } = renderHook(() => useProblems(), { wrapper });

            await waitFor(() => {
                expect(result.current.state.problems).toBeDefined();
            });

            act(() => {
                result.current.actions.changeSelectedProblem("1");
            });

            await waitFor(() => {
                expect(result.current.state.similarProblems).toBeUndefined();
            });
        });
    });
});
