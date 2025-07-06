import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * POST handler for creating new users
 * Adds user data to Firestore 'users' collection
 */
export async function POST(req: NextRequest) {
  try {
    const { name, studio_name, email, mobile, place } = await req.json();

    // Validate required fields
    if (!name || !studio_name || !email || !mobile || !place) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add user to Firestore
    const docRef = await addDoc(collection(db, "users"), {
      name,
      studio_name,
      email,
      mobile,
      place,
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      userId: docRef.id
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler for reading all users
 * Retrieves all users from Firestore 'users' collection
 */
export async function GET() {
  try {
    
    const querySnapshot = await getDocs(collection(db, "users"));
    
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      users,
      count: users.length
    });

  } catch (error) {    
    return NextResponse.json(
      { 
        error: 'Failed to fetch users',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 