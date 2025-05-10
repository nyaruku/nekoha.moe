import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Replace with the actual path to your SVG
const svgCursorPath = '/images/cursor.svg';

const socket = io('/cursor-sync', {
  path: '/api/live/cursor-ws/',
});

const CursorSync = () => {
  const [cursors, setCursors] = useState([]);
  // This state tracks the current scroll offsets so we can recalc viewport positions.
  const [scrollOffset, setScrollOffset] = useState({
    left: window.scrollX,
    top: window.scrollY,
  });

  // Send normalized position relative to full document dimensions
  useEffect(() => {
    const handleMouseMove = (event) => {
      const normX = event.pageX / document.documentElement.scrollWidth;
      const normY = event.pageY / document.documentElement.scrollHeight;
      socket.emit('cursor_position', { ...{ id: socket.id }, x: normX, y: normY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Receive and update cursor positions
  useEffect(() => {
    socket.on('cursor_position', (data) => {
      setCursors((prev) => {
        // Remove any previous data for this specific user (using a unique id)
        const updated = prev.filter((c) => c.id !== data.id);
        updated.push(data);
        return updated;
      });
    });

    socket.on('cursor_disconnect', ({ id }) => {
      setCursors((prev) => prev.filter((c) => c.id !== id));
    });

    return () => {
      socket.off('cursor_position');
      socket.off('cursor_disconnect');
    };
  }, []);

  // Update scroll offsets so we can adjust the rendered position of each cursor.
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
        // Convert normalized values back to the full document coordinates:
        const absX = cursor.x * document.documentElement.scrollWidth;
        const absY = cursor.y * document.documentElement.scrollHeight;
        // Adjust for the current scroll offset to map onto the fixed viewport.
        const viewportX = absX - scrollOffset.left;
        const viewportY = absY - scrollOffset.top;
        return (
          <div
            key={cursor.id || index}
            className="cursor"
            style={{
              position: 'absolute',
              left: `${viewportX}px`,
              top: `${viewportY}px`,
              width: '24px',
              height: '24px',
              background: `url(${svgCursorPath}) no-repeat center center`,
              backgroundSize: 'contain',  // Ensure the cursor fits within the box
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorSync;
