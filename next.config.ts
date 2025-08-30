import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,

    // 이미지 도메인 설정
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assignment.mathflat.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "assignment.mathflat.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
