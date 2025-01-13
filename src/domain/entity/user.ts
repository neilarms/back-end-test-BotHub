import { User } from '@prisma/client';

export interface IUser extends User {}

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - password
 *         - role
 *         - created_at
 *         - updated_at
 *       properties: 
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           nullable: true
 *         nickname:
 *           type: string
 *           nullable: true
 *         password:
 *           type: string
 *         avatar:
 *           type: string
 *           nullable: true
 *         name:
 *           type: string
 *           nullable: true
 *         surname:
 *           type: string
 *           nullable: true
 *         role:
 *           type: string
 *           enum:
 *             - USER
 *             - ADMIN
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */