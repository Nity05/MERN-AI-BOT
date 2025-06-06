import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { RiDeleteBin6Line, RiRobotLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Function to extract initials safely
  const getInitials = (name: string) => {
    const words = name.split(" ");
    const first = words[0]?.[0] ?? "";
    const second = words[1]?.[0] ?? "";
    return first + second;
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value?.trim();
    if (!content) return;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }

    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
    } catch (error: any) {
      console.error("Error sending chat:", error);
      if (error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please wait a moment and try again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to send message.");
      }
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Handle deleting all chats
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  // Load user chats when logged in
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  // Redirect to login if no user
  useEffect(() => {
    if (!auth?.user) {
      navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100vh",
        background: `linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 50%, #3d2525 100%)`,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 10% 20%, rgba(175, 62, 62, 0.1) 0%, transparent 50%), 
                      radial-gradient(circle at 90% 80%, rgba(205, 86, 86, 0.08) 0%, transparent 50%)`,
          zIndex: 1,
          pointerEvents: 'none'
        }
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.25,
          flexDirection: "column",
          p: 3,
          zIndex: 2,
          position: 'relative'
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: `linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(40, 25, 25, 0.9))`,
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(175, 62, 62, 0.2)',
            flexDirection: "column",
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, #CD5656, transparent)`,
            }
          }}
        >
          {/* User Profile Section */}
          <Box sx={{ p: 4, textAlign: 'center', borderBottom: '1px solid rgba(175, 62, 62, 0.1)' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 2,
                background: `linear-gradient(135deg, #AF3E3E, #CD5656)`,
                color: "white",
                fontWeight: 700,
                fontSize: '1.5rem',
                boxShadow: '0 8px 32px rgba(175, 62, 62, 0.3)',
                border: '2px solid rgba(218, 108, 108, 0.3)'
              }}
            >
              {auth?.user ? getInitials(auth.user.name) : ""}
            </Avatar>
            <Typography 
              sx={{ 
                color: '#EAEBD0', 
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              {auth?.user?.name || "User"}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#4ade80',
                  boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
                }}
              />
              <Typography sx={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Online
              </Typography>
            </Box>
          </Box>

          {/* AI Info Section */}
          <Box sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, rgba(175, 62, 62, 0.2), rgba(205, 86, 86, 0.1))`,
                  border: '1px solid rgba(175, 62, 62, 0.3)'
                }}
              >
                <RiRobotLine size={24} color="#CD5656" />
              </Box>
              <Box>
                <Typography sx={{ color: '#EAEBD0', fontWeight: 600, mb: 0.5 }}>
                  AI Assistant
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                  GPT 3.5 Turbo
                </Typography>
              </Box>
            </Box>

            <Typography 
              sx={{ 
                color: '#94a3b8', 
                fontSize: '0.9rem',
                lineHeight: 1.6,
                mb: 4
              }}
            >
              Ask me anything about knowledge, business, education, or advice. 
              I'm here to help with your questions and provide insights.
            </Typography>

            {/* Features */}
            <Box sx={{ mb: 4 }}>
              <Typography sx={{ color: '#EAEBD0', fontSize: '0.9rem', fontWeight: 600, mb: 2 }}>
                What I can help with:
              </Typography>
              {['Knowledge & Facts', 'Business Advice', 'Educational Content', 'General Questions'].map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                  <HiOutlineSparkles size={16} color="#CD5656" />
                  <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Button
              onClick={handleDeleteChats}
              sx={{
                mt: 'auto',
                py: 2,
                px: 3,
                borderRadius: '16px',
                background: `linear-gradient(135deg, rgba(175, 62, 62, 0.8), rgba(205, 86, 86, 0.6))`,
                color: 'white',
                fontWeight: 600,
                textTransform: 'none',
                border: '1px solid rgba(175, 62, 62, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: `linear-gradient(135deg, rgba(175, 62, 62, 1), rgba(205, 86, 86, 0.8))`,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(175, 62, 62, 0.3)',
                },
              }}
              startIcon={<RiDeleteBin6Line />}
            >
              Clear Conversation
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Chat Section */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.75, xs: 1, sm: 1 },
          flexDirection: "column",
          p: 3,
          zIndex: 2,
          position: 'relative'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(40, 25, 25, 0.9))`,
            backdropFilter: 'blur(20px)',
            borderRadius: '20px 20px 0 0',
            border: '1px solid rgba(175, 62, 62, 0.2)',
            borderBottom: 'none',
            p: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
          }}
        >
          <RiRobotLine size={28} color="#CD5656" />
          <Typography
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              background: `linear-gradient(135deg, #EAEBD0, #CD5656)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}
          >
            AI Assistant Chat
          </Typography>
        </Box>

        {/* Chat Messages Container */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            background: `linear-gradient(145deg, rgba(20, 20, 20, 0.9), rgba(30, 20, 20, 0.9))`,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(175, 62, 62, 0.2)',
            borderTop: 'none',
            borderBottom: 'none',
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            scrollBehavior: "smooth",
            p: 3,
            gap: 2,
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(175, 62, 62, 0.1)',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: `linear-gradient(135deg, #AF3E3E, #CD5656)`,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: `linear-gradient(135deg, #CD5656, #DA6C6C)`,
            },
          }}
        >
          {chatMessages.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textAlign: 'center',
                gap: 3
              }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, rgba(175, 62, 62, 0.1), rgba(205, 86, 86, 0.05))`,
                  border: '2px solid rgba(175, 62, 62, 0.2)'
                }}
              >
                <RiRobotLine size={48} color="#CD5656" />
              </Box>
              <Box>
                <Typography sx={{ color: '#EAEBD0', fontSize: '1.3rem', fontWeight: 600, mb: 1 }}>
                  Start a conversation
                </Typography>
                <Typography sx={{ color: '#94a3b8', fontSize: '1rem' }}>
                  Ask me anything and I'll help you find the answers
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              {chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))}
              {isTyping && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 3,
                    background: `linear-gradient(135deg, rgba(175, 62, 62, 0.1), rgba(205, 86, 86, 0.05))`,
                    borderRadius: '16px',
                    border: '1px solid rgba(175, 62, 62, 0.2)'
                  }}
                >
                  <RiRobotLine size={20} color="#CD5656" />
                  <Typography sx={{ color: '#94a3b8' }}>
                    AI is typing...
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: '#CD5656',
                          animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                          '@keyframes pulse': {
                            '0%, 80%, 100%': { opacity: 0.3 },
                            '40%': { opacity: 1 }
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>

        {/* Input Box */}
        <Box
          sx={{
            background: `linear-gradient(145deg, rgba(30, 30, 30, 0.9), rgba(40, 25, 25, 0.9))`,
            backdropFilter: 'blur(20px)',
            borderRadius: '0 0 20px 20px',
            border: '1px solid rgba(175, 62, 62, 0.2)',
            borderTop: 'none',
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.2)'
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: 'rgba(20, 20, 20, 0.8)',
              borderRadius: '16px',
              border: '2px solid rgba(175, 62, 62, 0.2)',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              '&:focus-within': {
                borderColor: '#CD5656',
                boxShadow: '0 0 0 4px rgba(205, 86, 86, 0.1)',
              }
            }}
          >
            <input
              ref={inputRef}
              type="text"
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                padding: "16px 20px",
                border: "none",
                outline: "none",
                color: "#EAEBD0",
                fontSize: "16px",
                fontFamily: 'inherit'
              }}
              placeholder="Type your message..."
            />
          </Box>
          <IconButton 
            onClick={handleSubmit}
            sx={{ 
              background: `linear-gradient(135deg, #AF3E3E, #CD5656)`,
              color: 'white',
              width: 48,
              height: 48,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 16px rgba(175, 62, 62, 0.3)',
              '&:hover': {
                background: `linear-gradient(135deg, #CD5656, #DA6C6C)`,
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(175, 62, 62, 0.4)',
              },
              '&:active': {
                transform: 'translateY(0)',
              }
            }}
          >
            <IoMdSend size={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;