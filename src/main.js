/** Точка входу. */
import './styles/main.css';
import { createApp } from './app.js';
import { TASKS } from './tasks/registry.js';

createApp(TASKS);
