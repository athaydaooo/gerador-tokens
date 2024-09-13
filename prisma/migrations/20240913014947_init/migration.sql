-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "caller" TEXT NOT NULL,
    "request" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "token" VARCHAR(6) NOT NULL,
    "destination" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "id_application" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_token_key" ON "Application"("token");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_id_application_fkey" FOREIGN KEY ("id_application") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
