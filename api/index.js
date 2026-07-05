import 'dotenv/config';
import express from 'express';
import { adminRouter } from '../server/routes/admin.js';
import { contentRouter } from '../server/routes/content.js';
import { mediaRouter, uploadsDir } from '../server/routes/media.js';
import { servicesRouter } from '../server/routes/services.js';
import { officesRouter } from '../server/routes/offices.js';

const app = express();

app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/api/admin', adminRouter);
app.use('/api/admin', mediaRouter);
app.use('/api/content', contentRouter);
app.use('/api/services', servicesRouter);
app.use('/api/offices', officesRouter);

export default app;
