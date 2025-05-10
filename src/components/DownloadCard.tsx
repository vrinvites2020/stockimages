export function DownloadCard() {
  const fileId = "1_RLIc3zPNolZOcGFVau_e1Vgb61N-Lgd";
  
  const handleDownload = () => {
    window.location.href = `/api/download?id=${fileId}`;
  };

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      maxWidth: '300px',
      margin: '20px'
    }}>
      <h3 style={{ marginBottom: '15px' }}>Download File</h3>
      <button
        onClick={handleDownload}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Download Now
      </button>
    </div>
  );
} 