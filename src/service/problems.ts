// * utils
import axios from "@/utils/axios-instance";

// 문제 리스트 조회
export const API_GET_PROBLEMS = async () => {
    const response = await axios.get("/problems");

    return response.data;
};

// 유사문제 리스트 조회
export const API_GET_SIMILAR_PROBLEMS = async (
    problemId: string,
    params: { excludedProblemIds: string[] }
) => {
    const response = await axios.get(`/problems/${problemId}/similarity`, {
        params: params,
    });

    return response.data;
};
