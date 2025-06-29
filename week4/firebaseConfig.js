import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { auth, db, storage } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function KanbanApp() {
  const [user, setUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) fetchBoards();
    });
    return () => unsubscribe();
  }, []);

  const fetchBoards = async () => {
    const querySnapshot = await getDocs(collection(db, "boards"));
    const boardData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBoards(boardData);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    const sourceBoard = boards.find((b) => b.id === result.source.droppableId);
    const destBoard = boards.find((b) => b.id === result.destination.droppableId);
    const [movedCard] = sourceBoard.cards.splice(result.source.index, 1);
    destBoard.cards.splice(result.destination.index, 0, movedCard);
    await updateDoc(doc(db, "boards", sourceBoard.id), { cards: sourceBoard.cards });
    await updateDoc(doc(db, "boards", destBoard.id), { cards: destBoard.cards });
    fetchBoards();
  };

  const addCard = async (boardId, text) => {
    const board = boards.find((b) => b.id === boardId);
    const updatedCards = [...(board.cards || []), { id: Date.now().toString(), text }];
    await updateDoc(doc(db, "boards", boardId), { cards: updatedCards });
    fetchBoards();
  };

  const handleFileUpload = async (file) => {
    const storageRef = ref(storage, `files/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  return (
    <div className="p-4">
      {!user ? (
        <AuthForm />
      ) : (
        <>
          <Button onClick={() => signOut(auth)}>Logout</Button>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {boards.map((board) => (
                <Droppable droppableId={board.id} key={board.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-100 p-4 rounded-xl">
                      <h2 className="text-xl font-bold mb-2">{board.name}</h2>
                      {board.cards?.map((card, index) => (
                        <Draggable draggableId={card.id} index={index} key={card.id}>
                          {(provided) => (
                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="mb-2">
                              <CardContent>
                                <p>{card.text}</p>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <div className="mt-2">
                        <Input
                          placeholder="New Task"
                          value={taskText}
                          onChange={(e) => setTaskText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addCard(board.id, taskText)}
                        />
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </>
      )}
    </div>
  );
}

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="flex gap-2 mt-4">
        <Button onClick={register}>Register</Button>
        <Button onClick={login}>Login</Button>
      </div>
    </div>
  );
}
