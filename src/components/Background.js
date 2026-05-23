"use client";

export default function Background() {
  return (
    <>
      <div className="bg-mesh fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Blob 1 */}
        <div className="absolute w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(125,249,194,0.07)_0%,transparent_70%)] -top-[200px] -right-[100px] animate-drift1" />
        
        {/* Blob 2 */}
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(167,139,250,0.07)_0%,transparent_70%)] -bottom-[150px] -left-[100px] animate-drift2" />
        
        {/* Blob 3 */}
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(244,114,182,0.05)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-drift3" />
      </div>
      <div className="noise" />
    </>
  );
}
