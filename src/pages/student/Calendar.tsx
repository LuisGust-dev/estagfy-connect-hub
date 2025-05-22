
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for important dates
const importantDates = [
  {
    id: 1,
    title: "Entrega de Relatório",
    date: new Date(2025, 5, 28), // June 28, 2025
    type: "deadline",
  },
  {
    id: 2,
    title: "Entrevista na TechSolutions",
    date: new Date(2025, 5, 25), // June 25, 2025
    type: "interview",
  },
  {
    id: 3,
    title: "Documentação Final",
    date: new Date(2025, 6, 15), // July 15, 2025
    type: "deadline",
  },
  {
    id: 4,
    title: "Reunião de Feedback",
    date: new Date(2025, 5, 30), // June 30, 2025
    type: "meeting",
  },
];

const StudentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Filter events for the selected date
  const eventsForSelectedDate = selectedDate 
    ? importantDates.filter(event => 
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  // Handler for date selection
  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setSelectedDate(newDate || null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} userType="student" />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Calendário de Estágio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    className="pointer-events-auto"
                    locale={ptBR}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Events for selected date */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate ? (
                    <span>Eventos para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                  ) : (
                    <span>Selecione uma data</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map((event) => (
                      <div key={event.id} className="border-l-4 border-estagfy-500 pl-4 py-2">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-gray-500">
                          {format(event.date, "HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    {selectedDate ? "Nenhum evento para esta data" : "Selecione uma data para ver os eventos"}
                  </p>
                )}
              </CardContent>
            </Card>
            
            {/* Upcoming events */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importantDates
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 3)
                    .map((event) => (
                      <div key={event.id} className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {format(event.date, "dd 'de' MMMM", { locale: ptBR })}
                          </p>
                        </div>
                        <div className={`rounded-full w-3 h-3 ${
                          event.type === 'deadline' 
                            ? 'bg-red-500' 
                            : event.type === 'interview' 
                              ? 'bg-blue-500' 
                              : 'bg-green-500'
                        }`} />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentCalendar;
