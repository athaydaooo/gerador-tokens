/*
  Warnings:

  - Added the required column `enabled` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
