-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "other_schema";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."Frequency" AS ENUM ('ONE_TIME', 'DAILY', 'WEEKLY', 'MONTHLY', 'ANNUALLY');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('FOOD', 'TRANSPORTATION', 'SHOPPING', 'ENTERTAINMENT', 'BILLS', 'HEALTH', 'LEARNING', 'INVESTMENT', 'INSURANCE', 'RENTAL', 'TAXES', 'CHARITY', 'GIFT', 'FAMILY', 'TRAVEL', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Currency" AS ENUM ('USD', 'JPY', 'TWD');

-- CreateTable
CREATE TABLE "public"."subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" "public"."Currency" NOT NULL,
    "frequency" "public"."Frequency" NOT NULL,
    "category" "public"."Category" NOT NULL,
    "shouldNotify" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

