import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../components/AppContext';
import {
  Sparkles,
  Send,
  Trash2,
  MessageSquare,
  Paperclip,
  Plus,
  ArrowRight,
  Info,
  Lock,
  X,
  FileCheck2,
  UploadCloud
} from 'lucide-react';
import { CHAT_SUGGESTED_PROMPTS } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';

export default function AIAssistant() {
  const {
    chatMessages,
    sendChatMessage,
    clearChat,
    isAiTyping
  } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [showReceiptOcrOverlay, setShowReceiptOcrOverlay] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrFileName, setOcrFileName] = useState('');

  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new chats
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMsg.trim()) return;

    sendChatMessage(inputMsg);
    setInputMsg('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  const handleReceiptUploadClick = () => {
    setShowReceiptOcrOverlay(true);
    setOcrFileName('');
    setIsOcrProcessing(false);
  };

  const handleSimulateOcrReceiptFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setOcrFileName(file.name);
      setIsOcrProcessing(true);

      setTimeout(() => {
        setIsOcrProcessing(false);
        setShowReceiptOcrOverlay(false);
        // Automatically inject OCR message!
        sendChatMessage(`Analyze this receipt: Trader Joe's grocery invoice for $88.20`, true);
      }, 1600);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[500px]" id="ai-assistant-page">

      {/* LEFT COLUMN: CO-PILOT CHAT DIRECTORY & PROMPTS (4 cols) */}
      <div className="lg:col-span-4 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/50 dark:border-zinc-850 p-6 flex flex-col justify-between" id="chat-sidebar-panel">

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-500 font-mono tracking-widest font-bold uppercase">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>CO-PILOT CONTEXT</span>
            </div>
            <h2 className="text-base font-bold text-gray-990 dark:text-white mt-1.5">Interactive Smart Engine</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">Ask questions, audit subscriptions, optimize targets, and upload receipts.</p>
          </div>

          {/* Quick suggestions templates */}
          <div className="space-y-2.5">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Suggested Inquiries</span>

            <div className="space-y-1.5" id="chat-prompts-list">
              {CHAT_SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  id={`suggested-prompt-${prompt.replace(/\s+/g, '-').toLowerCase()}`}
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="w-full text-left p-2.5 bg-gray-50 hover:bg-indigo-50/30 dark:bg-zinc-950/40 dark:hover:bg-indigo-950/10 border border-gray-250/40 dark:border-zinc-850 text-xs text-gray-600 dark:text-zinc-300 rounded-xl transition-all font-sans leading-snug cursor-pointer hover:border-indigo-500/30 flex items-center justify-between"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <ArrowRight className="h-3 w-3 text-indigo-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action control bar */}
        <div className="border-t border-gray-100 dark:border-zinc-800/80 pt-4 mt-6">
          <button
            id="clear-chat-history"
            onClick={clearChat}
            className="w-full py-2.5 border border-gray-250 dark:border-zinc-800 text-gray-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span>Reset Conversational Vault</span>
          </button>
        </div>

      </div>

      {/* RIGHT COLUMN: CHAT WINDOW WINDOW (8 cols) */}
      <div className="lg:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/50 dark:border-zinc-850 shadow-sm flex flex-col overflow-hidden h-full relative" id="chat-conversation-panel">

        {/* Chat window Header */}
        <div className="p-4 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-900 dark:text-white">FinPilot Wealth Co-Pilot</h3>
              <p className="text-[10px] text-emerald-500 font-mono">● LATEST MODEL ONLINE</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
            <Lock className="h-3 w-3" />
            <span>Encrypted Vault Pipeline</span>
          </div>
        </div>

        {/* Scrollable messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4" id="chat-messages-container">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                id={`chat-msg-${msg.id}`}
              >
                {/* Visual profile icon */}
                <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  isUser
                    ? 'bg-zinc-900 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 border border-indigo-500/10'
                }`}>
                  {isUser ? 'U' : <Sparkles className="h-4 w-4" />}
                </div>

                <div className={`space-y-1 ${isUser ? 'text-right' : 'text-left'}`}>
                  {/* Bubble wrapper */}
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed font-sans border whitespace-pre-wrap ${
                    isUser
                      ? 'bg-zinc-950 text-white border-transparent'
                      : 'bg-slate-50 dark:bg-zinc-950/40 text-gray-800 dark:text-zinc-200 border-gray-150/50 dark:border-zinc-850/60'
                  }`}>
                    {/* Render basic custom bold and listing formatting for clean readability */}
                    {msg.text.split('\n').map((line, lidx) => {
                      // Basic bold replacement: **text**
                      let content: React.ReactNode = line;
                      const boldMatch = line.match(/\*\*(.*?)\*\*/g);
                      if (boldMatch) {
                        boldMatch.forEach((match) => {
                          const rawText = match.replace(/\*\*/g, '');
                          const parts = line.split(match);
                          content = (
                            <>
                              {parts[0]}
                              <strong className="font-bold text-indigo-500 dark:text-indigo-400">{rawText}</strong>
                              {parts[1]}
                            </>
                          );
                        });
                      }

                      return (
                        <p key={lidx} className={`${line.startsWith('-') || line.startsWith('*') ? 'pl-2 text-indigo-650 dark:text-zinc-300' : ''} mt-1.5 first:mt-0`}>
                          {content}
                        </p>
                      );
                    })}
                  </div>

                  <span className="text-[9px] text-gray-400 font-mono">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}

          {/* AI Typing loader */}
          <AnimatePresence>
            {isAiTyping && (
              <div className="flex gap-3 mr-auto max-w-[85%]" id="chat-typing-loader">
                <div className="h-8 w-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 border border-indigo-500/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-slate-50 dark:bg-zinc-950/40 text-gray-500 dark:text-zinc-400 border border-gray-150/50 dark:border-zinc-850/60 p-4 rounded-2xl text-xs flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Input box */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">

            {/* Attachment Button */}
            <button
              id="chat-paperclip-btn"
              type="button"
              onClick={handleReceiptUploadClick}
              className="p-3 text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 rounded-xl transition-all shrink-0 cursor-pointer"
              title="Attach Receipt Screenshot"
            >
              <Paperclip className="h-5 w-5" />
            </button>

            {/* Input field */}
            <input
              id="chat-text-input"
              type="text"
              placeholder="Ask FinPilot to evaluate budgets, review subscriptions..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 h-12 px-4 rounded-xl bg-gray-50 dark:bg-zinc-950 border border-gray-250 dark:border-zinc-800 text-xs outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 text-gray-900 dark:text-white"
            />

            {/* Send Button */}
            <button
              id="chat-send-btn"
              type="submit"
              disabled={!inputMsg.trim()}
              className="p-3.5 bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white rounded-xl transition-all hover:bg-zinc-900 dark:hover:bg-white disabled:opacity-30 disabled:hover:bg-zinc-950 shrink-0 cursor-pointer"
            >
              <Send className="h-4.5 w-4.5" />
            </button>

          </form>
        </div>

      </div>

      {/* OVERLAY COMPONENT: SIMULATED OCR RECEIPT ATTACHMENT MODAL */}
      <AnimatePresence>
        {showReceiptOcrOverlay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm" id="ocr-receipt-overlay">
            <motion.div
              id="ocr-receipt-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-3xl w-full max-w-sm shadow-2xl p-6 font-sans text-center"
            >
              <div className="flex justify-end">
                <button onClick={() => setShowReceiptOcrOverlay(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <X className="h-4.5 w-4.5 text-gray-400" />
                </button>
              </div>

              <div className="mt-2 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center mx-auto">
                  <UploadCloud className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Receipt Screenshot</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">Upload an image or PDF invoice. FinPilot's OCR parser extracts items instantly into chat.</p>
                </div>

                <div className="relative border border-dashed border-gray-250 dark:border-zinc-850 p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950/30">
                  <input
                    id="ocr-upload-field"
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleSimulateOcrReceiptFile}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {isOcrProcessing ? (
                    <div className="space-y-2">
                      <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                      <span className="text-[10px] font-semibold text-gray-500 block">Extracting purchase...</span>
                    </div>
                  ) : ocrFileName ? (
                    <div className="space-y-1 text-emerald-500 font-bold">
                      <FileCheck2 className="h-6 w-6 mx-auto" />
                      <span className="text-[10px] truncate max-w-[150px] block mx-auto">{ocrFileName}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-gray-600 dark:text-zinc-400 block">Tap to pick screenshot</span>
                      <span className="text-[10px] text-gray-400 block">PNG, JPG, PDF (Max 10MB)</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
