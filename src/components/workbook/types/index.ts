// [
//     {
//       "id": 1, // 문제 고유의 아이디
//       "level": 4, // 문제의 난이도 1,2,3,4,5 (1:하, 2:중하, 3:중, 4:상, 5:최상)
//       "type": 1, // 1,2 (1: 객관식, 2: 주관식)
//       "problemImageUrl": "http://{...}/problem.png", // 문제 이미지 경로
//       "title": "몫과 나머지 구하기", // 문제 제목
//       "answerRate": 90 // 정답률
//     },
//       ...
//   ]

export interface Problem {
    id: string;
    level: number;
    type: number;
    problemImageUrl: string;
    title: string;
    answerRate: number;
}
