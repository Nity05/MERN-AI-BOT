import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { RiRobotLine, RiUser3Line } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";

interface ChatItemProps {
  content: string;
  role: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const isUser = role === "user";
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 2,
        mb: 3,
        animation: 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: `translateY(20px) ${isUser ? 'translateX(20px)' : 'translateX(-20px)'}`
          },
          to: {
            opacity: 1,
            transform: 'translateY(0) translateX(0)'
          }
        }
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          flexShrink: 0,
          position: 'relative'
        }}
      >
        <Avatar
          sx={{
            width: 40,
            height: 40,
            background: isUser 
              ? `linear-gradient(135deg, #EAEBD0, #DA6C6C)`
              : `linear-gradient(135deg, #AF3E3E, #CD5656)`,
            color: isUser ? '#AF3E3E' : 'white',
            border: `2px solid ${isUser ? 'rgba(218, 108, 108, 0.3)' : 'rgba(175, 62, 62, 0.3)'}`,
            boxShadow: `0 4px 16px ${isUser ? 'rgba(218, 108, 108, 0.2)' : 'rgba(175, 62, 62, 0.3)'}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: `0 6px 20px ${isUser ? 'rgba(218, 108, 108, 0.3)' : 'rgba(175, 62, 62, 0.4)'}`,
            }
          }}
        >
          {isUser ? (
            <RiUser3Line size={20} />
          ) : (
            <RiRobotLine size={20} />
          )}
        </Avatar>
        
        {/* Status indicator for AI */}
        {!isUser && (
          <Box
            sx={{
              position: 'absolute',
              top: -2,
              right: -2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #4ade80, #22c55e)`,
              border: '2px solid rgba(20, 20, 20, 0.9)',
              boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.6 }
              }
            }}
          />
        )}
      </Box>

      {/* Message Content */}
      <Box
        sx={{
          maxWidth: '70%',
          minWidth: '200px',
          position: 'relative'
        }}
      >
        {/* Message Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
            justifyContent: isUser ? 'flex-end' : 'flex-start'
          }}
        >
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: isUser ? '#DA6C6C' : '#CD5656',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {isUser ? 'You' : 'AI Assistant'}
          </Typography>
          {!isUser && <HiSparkles size={12} color="#CD5656" />}
        </Box>

        {/* Message Bubble */}
        <Box
          sx={{
            position: 'relative',
            background: isUser
              ? `linear-gradient(135deg, rgba(234, 235, 208, 0.15), rgba(218, 108, 108, 0.1))`
              : `linear-gradient(135deg, rgba(175, 62, 62, 0.1), rgba(205, 86, 86, 0.05))`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isUser ? 'rgba(218, 108, 108, 0.2)' : 'rgba(175, 62, 62, 0.2)'}`,
            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            p: 3,
            boxShadow: `0 4px 16px ${isUser ? 'rgba(218, 108, 108, 0.1)' : 'rgba(175, 62, 62, 0.1)'}`,
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 8px 24px ${isUser ? 'rgba(218, 108, 108, 0.15)' : 'rgba(175, 62, 62, 0.15)'}`,
              border: `1px solid ${isUser ? 'rgba(218, 108, 108, 0.3)' : 'rgba(175, 62, 62, 0.3)'}`,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${isUser ? 'rgba(218, 108, 108, 0.3)' : 'rgba(175, 62, 62, 0.3)'}, transparent)`,
            }
          }}
        >
          {/* Decorative corner element */}
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: isUser ? -8 : 'auto',
              left: isUser ? 'auto' : -8,
              width: 16,
              height: 16,
              background: `linear-gradient(135deg, ${isUser ? '#DA6C6C' : '#AF3E3E'}, ${isUser ? '#CD5656' : '#CD5656'})`,
              borderRadius: '50%',
              opacity: 0.6,
              filter: 'blur(4px)'
            }}
          />

          <Typography
            sx={{
              color: '#EAEBD0',
              fontSize: '1rem',
              lineHeight: 1.6,
              fontWeight: 400,
              wordBreak: 'break-word',
              '& p': {
                margin: 0,
                marginBottom: 1,
                '&:last-child': {
                  marginBottom: 0
                }
              },
              '& code': {
                background: 'rgba(175, 62, 62, 0.2)',
                color: '#DA6C6C',
                padding: '2px 6px',
                borderRadius: '4px',
                fontSize: '0.9em',
                fontFamily: 'monospace'
              },
              '& pre': {
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(175, 62, 62, 0.3)',
                borderRadius: '8px',
                padding: 2,
                overflow: 'auto',
                fontSize: '0.9em',
                '& code': {
                  background: 'transparent',
                  padding: 0
                }
              }
            }}
          >
            {content}
          </Typography>

          {/* Message timestamp */}
          <Typography
            sx={{
              fontSize: '0.7rem',
              color: isUser ? 'rgba(218, 108, 108, 0.6)' : 'rgba(175, 62, 62, 0.6)',
              mt: 1,
              textAlign: isUser ? 'right' : 'left',
              opacity: 0.8
            }}
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>

        {/* Message tail */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            [isUser ? 'right' : 'left']: -6,
            width: 0,
            height: 0,
            borderLeft: isUser ? 'none' : '12px solid transparent',
            borderRight: isUser ? '12px solid transparent' : 'none',
            borderTop: `12px solid ${isUser ? 'rgba(218, 108, 108, 0.1)' : 'rgba(175, 62, 62, 0.1)'}`,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
          }}
        />
      </Box>
    </Box>
  );
};

export default ChatItem;