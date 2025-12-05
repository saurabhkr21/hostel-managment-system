import prisma from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const year = searchParams.get("year");
    const roomBlock = searchParams.get("roomBlock");
    const attendanceStatus = searchParams.get("attendanceStatus");
    const searchQuery = searchParams.get("searchQuery");

    const where: any = {};

    if (department) {
      where.department = department;
    }
    if (year) {
      where.year = parseInt(year);
    }
    if (roomBlock) {
      where.roomBlock = roomBlock;
    }
    if (attendanceStatus) {
      where.attendanceStatus = attendanceStatus;
    }
    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { studentId: { contains: searchQuery, mode: "insensitive" } },
        { email: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    const students = await prisma.student.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const student = await prisma.student.create({
      data: {
        studentId: body.studentId,
        name: body.name,
        email: body.email,
        department: body.department,
        year: body.year,
        roomNumber: body.roomNumber,
        roomBlock: body.roomBlock,
        phone: body.phone,
        avatar: body.avatar,
        alt: body.alt,
        attendanceStatus: body.attendanceStatus || "present",
        lastActivity: body.lastActivity,
        parentContact: body.parentContact || false,
        joinDate: body.joinDate,
        emergencyContact: body.emergencyContact,
        address: body.address,
        medicalInfo: body.medicalInfo,
      },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "Failed to create student" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    const student = await prisma.student.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(student);
  } catch (error) {
    console.error("Error updating student:", error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
