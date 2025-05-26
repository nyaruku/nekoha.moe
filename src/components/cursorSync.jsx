import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const CursorSync = () => {
  const svgCursorPath = '/images/cursor.svg';

  const getNameFromCookie = () => {
    const name = document.cookie
      .split('; ')
      .find(row => row.startsWith('username='))
      ?.split('=')[1];
    return decodeURIComponent(name || '');
  };

  const [socket, setSocket] = useState(null);
  const [cursors, setCursors] = useState([]);
  const [scrollOffset, setScrollOffset] = useState({
    left: window.scrollX,
    top: window.scrollY,
  });

  // Create socket when component mounts
  useEffect(() => {
    const s = io('/cursor-sync', {
      path: '/api/live/cursor-ws/',
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Send cursor positions
  useEffect(() => {
    if (!socket) return;

    const username = getNameFromCookie();
    const handleMouseMove = (event) => {
      const normX = event.pageX / document.documentElement.scrollWidth;
      const normY = event.pageY / document.documentElement.scrollHeight;
      socket.emit('cursor_position', {
        id: socket.id,
        x: normX,
        y: normY,
        name: username,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [socket]);

  // Handle incoming cursor positions
  useEffect(() => {
    if (!socket) return;

    const handlePosition = (data) => {
      setCursors(prev => {
        const updated = prev.filter(c => c.id !== data.id);
        updated.push(data);
        return updated;
      });
    };

    const handleDisconnect = ({ id }) => {
      setCursors(prev => prev.filter(c => c.id !== id));
    };

    socket.on('cursor_position', handlePosition);
    socket.on('cursor_disconnect', handleDisconnect);

    return () => {
      socket.off('cursor_position', handlePosition);
      socket.off('cursor_disconnect', handleDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset({
        left: window.scrollX,
        top: window.scrollY,
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {cursors.map((cursor, index) => {
        const absX = cursor.x * document.documentElement.scrollWidth;
        const absY = cursor.y * document.documentElement.scrollHeight;
        const viewportX = absX - scrollOffset.left;
        const viewportY = absY - scrollOffset.top;

        return (
          <div
            key={cursor.id || index}
            style={{
              position: 'absolute',
              left: `${viewportX}px`,
              top: `${viewportY}px`,
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <div
              className="cursor"
              style={{
                width: '24px',
                height: '24px',
                background: `url(${svgCursorPath}) no-repeat center center`,
                backgroundSize: 'contain',
              }}
            />
            <div
              style={{
                marginTop: '2px',
                padding: '2px 6px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                fontSize: '12px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                maxWidth: '160px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {cursor.name || 'Anonymous'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CursorSync;
