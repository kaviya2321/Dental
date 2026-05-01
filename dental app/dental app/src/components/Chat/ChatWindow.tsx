import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/avatar';
import { ScrollArea } from '@/components/scroll-area';
import { ArrowLeft, Send, Check, CheckCheck } from 'lucide-react';
import { Message } from '@/types';

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  otherPartyName: string;
  myId: string;
  onBack: () => void;
}

export const ChatWindow = ({ 
  messages, 
  onSendMessage, 
  otherPartyName,
  myId,
  onBack 
}: ChatWindowProps) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-md">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherPartyName}`} />
          <AvatarFallback>{otherPartyName[0]}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{otherPartyName}</span>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.senderId === myId ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.senderId === myId 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {m.text}
                <div className={`text-[10px] mt-1 opacity-70 flex items-center justify-end gap-1 ${m.senderId === myId ? 'text-right' : 'text-left'}`}>
                  {m.timestamp}
                  {m.senderId === myId && (
                    <span>
                      {m.readStatus === 'read' ? (
                        <CheckCheck className="w-3 h-3 text-blue-200" />
                      ) : m.readStatus === 'delivered' ? (
                        <CheckCheck className="w-3 h-3 text-slate-300" />
                      ) : (
                        <Check className="w-3 h-3 text-slate-300" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 bg-white border-t flex gap-2">
        <Input 
          placeholder="Type a message..." 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="rounded-full"
        />
        <Button size="icon" onClick={handleSend} className="rounded-full">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
