"use server";

import prisma from "../lib/prisma";

export async function getDoctorNumber() {
  const users = await prisma.doctor.groupBy({
    by: ["createdAt"],
    _count: {
      id: true, // Count the number of users created in each month
    },
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return users;
}

export async function getPatientNumber() {
  const users = await prisma.patient.groupBy({
    by: ["createdAt"],
    _count: {
      id: true, // Count the number of users created in each month
    },
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return users;
}
