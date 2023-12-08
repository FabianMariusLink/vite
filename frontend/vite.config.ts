import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.VITE_GOOGLE_MAPS_API_KEY': JSON.stringify(env.VITE_GOOGLE_MAPS_API_KEY),
        },
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: 'http://localhost:8080'
                }
            }
        }
    }
})