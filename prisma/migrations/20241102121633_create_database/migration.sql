-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "last-Checked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deviceStatusId" INTEGER,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_statuses" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "device_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_logs" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_ipAddress_key" ON "devices"("ipAddress");

-- CreateIndex
CREATE UNIQUE INDEX "device_logs_deviceId_timestamp_key" ON "device_logs"("deviceId", "timestamp");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_deviceStatusId_fkey" FOREIGN KEY ("deviceStatusId") REFERENCES "device_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_logs" ADD CONSTRAINT "device_logs_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
