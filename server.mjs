import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Add error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Basic request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Serve static files from the 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// Add a route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

// Add health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'out', 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Static site served at http://localhost:${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log('⚡ Server is running and ready to serve requests...');
    console.log('🔗 Open http://localhost:8080 in your browser');
});

server.on('error', (error) => {
    console.error('❌ Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${PORT} is already in use. Please try a different port or kill the existing process.`);
        process.exit(1);
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Keep the process alive and provide console commands
console.log('\n📝 Available commands:');
console.log('  - Press Ctrl+C to stop the server');
console.log('  - Type "restart" to restart the server');
console.log('  - Type "health" to check server health\n');

process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        const command = chunk.toString().trim();
        if (command === 'health') {
            console.log('✅ Server is healthy and running on port', PORT);
        } else if (command === 'restart') {
            console.log('🔄 Restarting server...');
            server.close(() => {
                console.log('✅ Server restarted');
            });
        } else if (command !== '') {
            console.log(`❓ Unknown command: ${command}`);
            console.log('Available commands: health, restart, Ctrl+C to exit');
        }
    }
});

process.stdin.on('end', () => {
    console.log('👋 Goodbye!');
    process.exit(0);
});