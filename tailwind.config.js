/** @type {import('tailwindcss').Config} */

export default {
    darkMode: ["class"],
    mode: "jit",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    	screens: {
    		xs: '0px',
    		sm: '600px',
    		md: '900px',
    		lg: '1200px',
    		xl: '1536px'
    	},
    	extend: {
    		colors: {
    			primary: {
    				'50': '#FDF8EC',
    				'100': '#FDF8EC',
    				'200': '#FBF1DA',
    				'300': '#F6E2B4',
    				'400': '#EDC569',
    				'500': '#E9B744',
    				'600': '#BB9337',
    				'700': '#8E6F29',
    				'800': '#493915',
    				'900': '#33270E',
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				'25': '#EBF1FF',
    				'50': '#8497BE',
    				'100': '#7789AD',
    				'200': '#5E6D8C',
    				'300': '#44506A',
    				'400': '#2B3449',
    				'500': '#111827',
    				'600': '#0E131F',
    				'700': '#0A0E17',
    				'800': '#070A10',
    				'900': '#030508',
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			natural: {
    				'25': '#FCFCFD',
    				'50': '#F9FAFB',
    				'100': '#F3F4F6',
    				'200': '#E5E7EB',
    				'300': '#D1D5DB',
    				'400': '#9CA3AF',
    				'500': '#6B7280',
    				'600': '#4B5563',
    				'700': '#374151',
    				'800': '#1F2937',
    				'900': '#111827'
    			},
    			success: {
    				'50': '#F6FEF9',
    				'100': '#ECFDF3',
    				'200': '#D1FADF',
    				'300': '#6CE9A6',
    				'400': '#32D583',
    				'500': '#12B76A',
    				'600': '#039855',
    				'700': '#027A48',
    				'800': '#05603A',
    				'900': '#054F31'
    			},
    			warning: {
    				'50': '#FFFAEB',
    				'100': '#FEF0C7',
    				'200': '#FEDF89',
    				'300': '#FEC84B',
    				'400': '#FDB022',
    				'500': '#F79009',
    				'600': '#DC6803',
    				'700': '#B54708',
    				'800': '#93370D',
    				'900': '#7A2E0E'
    			},
    			error: {
    				'50': '#FEF3F2',
    				'100': '#FEE4E2',
    				'200': '#FECDCA',
    				'300': '#FDA29B',
    				'400': '#F97066',
    				'500': '#F04438',
    				'600': '#D92D20',
    				'700': '#B42318',
    				'800': '#912018',
    				'900': '#7A271A'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	},
    	variants: {}
    },
    corePlugins: {
        // preflight: false,
    },
    plugins: [require("tailwindcss-animate")],
};
