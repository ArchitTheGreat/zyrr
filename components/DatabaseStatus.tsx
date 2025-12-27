"use client";

import { useState, useEffect } from 'react';

export default function DatabaseStatus() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [dbType, setDbType] = useState<'turso' | 'sqlite' | null>(null);

  useEffect(() => {
    // Check database status via API (server-side)
    const checkDatabase = async () => {
      try {
        const response = await fetch('/api/database/status');
        if (response.ok) {
          const data = await response.json();
          setStatus(data.status);
          setDbType(data.type);
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Database status check failed:', error);
        setStatus('error');
      }
    };

    checkDatabase();
  }, []);

  if (status === 'loading') {
    return (
      <div className="fixed bottom-4 left-4 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1 text-xs text-yellow-300 animate-pulse">
        Connecting to database...
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="fixed bottom-4 left-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-3 py-1 text-xs text-red-300">
        Database connection failed
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-3 py-1 text-xs text-blue-300">
      Connected to {dbType} database
    </div>
  );
}