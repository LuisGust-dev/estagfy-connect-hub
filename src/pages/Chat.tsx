
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for companies and chat messages
const companies = [
  {
    id: 1,
    name: "TechSolutions",
    logo: "/placeholder.svg",
  },
  {
    id: 2,
    name: "MarketingPro",
    logo: "/placeholder.svg",
  },
];

// Mock chat messages
const initialMessages = [
  {
    id: 1,
    applicationId: 2,
    sender: "company",
    content: "Olá João, bem-vindo à equipe da MarketingPro! Estamos felizes em ter você conosco.",
    timestamp: "2025-05-20T14:30:00.000Z",
  },
  {
    id: 2,
    applicationId: 2,
    sender: "student",
    content: "Olá! Muito obrigado pela oportunidade. Estou muito animado para começar!",
    timestamp: "2025-05-20T14:35:00.000Z",
  },
  {
    id: 3,
    applicationId: 2,
    sender: "company",
    content: "Ótimo! Você poderia comparecer na segunda-feira às 9h para assinar os documentos e começar sua integração?",
    timestamp: "2025-05-20T14:40:00.000Z",
  },
];

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const applicationId = parseInt(id || "0");
  const [messages, setMessages] = useState(initialMessages.filter(msg => msg.applicationId === applicationId));
  const [newMessage, setNewMessage] = useState("");
  
  // Find company information
  const company = companies.find(c => c.id === applicationId);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    const message = {
      id: messages.length + 1,
      applicationId,
      sender: "student" as const,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  // Automatically scroll to bottom of messages
  useEffect(() => {
    const chatContainer = document.getElementById("chat-messages");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  
  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn={true} userType="student" />
        <div className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <Card className="w-full max-w-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Conversa não encontrada</h2>
                <p className="text-gray-500 mb-6">A conversa que você está procurando não existe ou não está disponível.</p>
                <Button asChild>
                  <Link to="/student/dashboard">Voltar para o Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="student" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/student/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Dashboard
              </Link>
            </Button>
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                </div>
                <CardTitle>{company.name}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div id="chat-messages" className="h-[400px] overflow-y-auto mb-4 space-y-4 p-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.sender === "student"
                            ? "bg-estagfy-500 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "student" ? "text-estagfy-100" : "text-gray-500"
                        }`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatPage;
