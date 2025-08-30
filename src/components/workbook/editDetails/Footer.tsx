const EditDetailsFooter = ({
    summary,
}: {
    summary: {
        levels: string;
        count: number;
    } | null;
}) => {
    if (summary?.count === 0) {
        return (
            <div className='flex justify-end text-[16px] font-[700]'>
                <p className='text-[#FD5354]'>문제 수 0개</p>
            </div>
        );
    }

    return (
        <div className='flex gap-1 justify-end items-center text-[16px]  '>
            <p className='text-[#c0c0c0] font-[400] mr-1'> {summary?.levels}</p>
            <p className='text-[#c0c0c0] font-[400] pb-0.5'> | </p>
            <h1 className='text-white font-[700]'>
                문제 수 {summary?.count}개
            </h1>
        </div>
    );
};

export default EditDetailsFooter;
