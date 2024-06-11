/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': {
                    900: '#153448',
                    800: '#1f4c69',
                    700: '#255c80',
                    600: '#2f75a2',
                    500: '#398ec4',
                    400: '#5ea3d0',
                    300: '#95c3e0',
                    200: '#bbd8eb',
                    100: '#edf5fa'
                }
            }
        },
    },
    plugins: [],
}

