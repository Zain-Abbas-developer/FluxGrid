import {Queue} from 'bullmq';
import {redis} from './redis.js';


export const deadLetterQueue = new Queue("dead-letter", {
  connection: redis,
});