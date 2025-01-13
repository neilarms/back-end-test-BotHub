import { CategoriesFeedbackPost } from '@prisma/client';

export interface ICategoriesFeedbackPost extends CategoriesFeedbackPost {}

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoriesFeedbackPost:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - ru_title
 *         - created_at
 *       properties: 
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         ru_title:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */