import React from 'react'

const NotPage = () => {
  return (

    <div className="min-h-screen w-full relative bg-white">
  {/* Warm Orange Glow Left */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "#ffffff",
      backgroundImage: `
        radial-gradient(
          circle at top left,
          rgba(255, 140, 60, 0.5),
          transparent 70%
        )
      `,
      filter: "blur(80px)",
      backgroundRepeat: "no-repeat",
    }}
  />
     <div className='flex items-center justify-center flex-col space-y-12 relative z-10 mt-[100px] mb-[100px]' >
        <img src="404_NotFound.png" alt="not_found" className='w-[450px] h-auto'/>
        <p className='text-xl font-semibold'>Bạn đã đi vào vùng cấm 👿 </p>
        <a href="/" className='bg-[#ff6347] px-6 py-2 rounded-2xl shadow-md hover:shadow-lg text-white transition-all transform  duration-200 hover:scale-125 active:scale-90' >Quay lại 😏</a>
    </div>
</div>

  )
}

export default NotPage
