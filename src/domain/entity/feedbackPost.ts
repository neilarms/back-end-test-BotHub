import { FeedbackPost } from '@prisma/client';

export interface IFeedbackPost extends FeedbackPost {}

/**
 * @openapi
 * components:
 *   schemas:
 *     FeedbackPost:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - categoryId
 *         - status
 *         - rating
 *         - authorId
 *         - created_at
 *         - updated_at
 *       properties: 
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         categoryId:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - NEW
 *             - IN_PROGRESS
 *             - PUBLISHED
 *             - REJECTED
 *         rating:
 *           type: integer
 *         authorId:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */