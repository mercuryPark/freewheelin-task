// level에 따른 매핑
const LEVEL_MAP: Record<number, { label: string; color: string }> = {
    1: { label: "하", color: "#5C5C5C" },
    2: { label: "중하", color: "#00ABFF" },
    3: { label: "중", color: "#54C0B1" },
    4: { label: "상", color: "#FFC64D" },
    5: { label: "최상", color: "#FD5354" },
};

const LevelBadge = ({ level }: { level: number }) => {
    const levelData = LEVEL_MAP[level];

    if (!levelData) return null; // 잘못된 level 처리

    return (
        <div
            className='text-[11px] font-[400] bg-[#F5F5F5] px-1 py-0.5 rounded-[6px] flex items-center justify-center'
            style={{ color: levelData.color }}
        >
            {levelData.label}
        </div>
    );
};

export default LevelBadge;
