import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	extend: {
    		fontFamily: {
    			pretendard: [
    				'Pretendard',
    				'sans-serif'
    			]
            },
    	}
    },
};

export default config;
