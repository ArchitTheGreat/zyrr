import Image from "next/image";

export default function Home() {
  return (
    <div 
      className="snap-y snap-mandatory h-screen overflow-y-scroll snap-proximity bg-black" 
      style={{ 
        scrollBehavior: 'auto',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      {/* Gallery Item 1 */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="relative w-full h-full">
          <img 
            src="https://media.istockphoto.com/id/163196980/photo/sunset-panorama.jpg?s=612x612&w=0&k=20&c=kHv1TLoxBv5D2wZVnFUvyrU4KFbvJ9tEiXoG7h9y6ig=" 
            alt="Sunset Panorama"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-6xl font-bold mb-4">Artwork 1</h1>
              <p className="text-xl opacity-90">Sunset Panorama</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Item 2 */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Artwork 2</h1>
          <p className="text-xl opacity-90">Perfect snap scrolling</p>
        </div>
      </section>

      {/* Gallery Item 3 */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Artwork 3</h1>
          <p className="text-xl opacity-90">Zero JS, pure CSS</p>
        </div>
      </section>

      {/* Gallery Item 4 */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Artwork 4</h1>
          <p className="text-xl opacity-90">Mobile ready</p>
        </div>
      </section>

      {/* Gallery Item 5 */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-4">Artwork 5</h1>
          <p className="text-xl opacity-90">Infinite gallery</p>
        </div>
      </section>
    </div>
  );
}
