import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  DocumentData,
  WhereFilterOp
} from "firebase/firestore";
import { db } from "./firebase";

// User interface
export interface User {
  id?: string;
  name: string;
  studio_name: string;
  email: string;
  mobile: string;
  place: string;
  createdAt?: string;
}

// Generic Firestore operations
export class FirestoreService {
  // Create a new document
  static async createDocument<T extends DocumentData>(
    collectionName: string, 
    data: T
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      throw error;
    }
  }

  // Get all documents from a collection
  static async getAllDocuments<T>(
    collectionName: string
  ): Promise<T[]> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      throw error;
    }
  }

  // Get a single document by ID
  static async getDocumentById<T>(
    collectionName: string, 
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as T;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  // Update a document
  static async updateDocument<T extends DocumentData>(
    collectionName: string, 
    documentId: string, 
    data: Partial<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      throw error;
    }
  }

  // Delete a document
  static async deleteDocument(
    collectionName: string, 
    documentId: string
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  }

  // Query documents with filters
  static async queryDocuments<T>(
    collectionName: string,
    field: string,
    operator: WhereFilterOp,
    value: string | number | boolean
  ): Promise<T[]> {
    try {
      const q = query(
        collection(db, collectionName), 
        where(field, operator, value)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      throw error;
    }
  }
}

// User-specific operations
export class UserService {
  // Create a new user
  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<string> {
    return FirestoreService.createDocument('users', userData);
  }

  // Get all users
  static async getAllUsers(): Promise<User[]> {
    return FirestoreService.getAllDocuments<User>('users');
  }

  // Get user by ID
  static async getUserById(userId: string): Promise<User | null> {
    return FirestoreService.getDocumentById<User>('users', userId);
  }

  // Update user
  static async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    return FirestoreService.updateDocument('users', userId, userData);
  }

  // Delete user
  static async deleteUser(userId: string): Promise<void> {
    return FirestoreService.deleteDocument('users', userId);
  }

  // Get users by place
  static async getUsersByPlace(place: string): Promise<User[]> {
    return FirestoreService.queryDocuments<User>('users', 'place', '==', place);
  }

  // Get users by email
  static async getUserByEmail(email: string): Promise<User[]> {
    return FirestoreService.queryDocuments<User>('users', 'email', '==', email);
  }
} 