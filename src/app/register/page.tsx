
export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full bg-white font-['Poppins']">
      <section className="flex w-1/2 flex-col pt-[40px] pb-[60px] px-[41px]">
        
       <div className="mb-4">
            <h1 className="font-anonymous-700 text-[56px] text-green-bold">
                Kater<span className="text-black">Ly</span>
            </h1>
        </div>
        
        <div>
            <h1 className="text-[56px] font-bold text-black">Buat akun</h1>
            <div className="mb-10 mt-4">
                <span className="text-[24px] font-poppins-400 text-graytext-secondary">Sudah punya akun? </span>
                <a href="/login" className="text-[24px] font-poppins-600 text-green-primary hover:underline">Masuk</a>
            </div>
        </div>

        <form className="flex w-full max-w-[595px] flex-col gap-[23px] px-[10px] py-[10px]">

          <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
            <label className="text-[24px] font-poppins-400 text-black">Nama Usaha</label>
            <input 
              type="text" 
              placeholder="Nama Catering" 
              className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
            />
          </div>

          <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
            <label className="text-[24px] font-poppins-400 text-black">Nama Anda</label>
            <input 
              type="text" 
              placeholder="Nama Anda" 
              className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
            />
          </div>

          <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
            <label className="text-[24px] font-poppins-400 text-black">Email</label>
            <input 
              type="email" 
              placeholder="nama@gmail.com" 
              className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
            />
          </div>

          <div className="flex flex-col gap-[10px] px-[10px] pb-[7px]">
            <label className="text-[24px] font-poppins-400 text-black">Password</label>
            <input 
              type="password" 
              placeholder="Minimal 8 Karakter" 
              className="bg-white rounded-[18px] px-[30px] py-[15px] shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] text-[24px] font-poppins-400 text-graytext-secondary"
            />
          </div>

         <div className="flex flex-col w-full justify-center px-[10px] pt-[46px] gap-[10px]">
            <button 
              type="submit" 
              className="flex h-[75px] w-full max-w-[555px] items-center justify-center gap-[14px] rounded-[18px] bg-green-bold px-[50px] font-poppins-400 text-[24px] text-white shadow-[0_4px_11px_0_rgba(0,0,0,0.25)] cursor-pointer"
            >
              Buat akun gratis
            </button>

            <p className="text-center font-poppins-400 text-graytext-secondary text-[16px]">
              Dengan mendaftar Anda menyetujui Syarat & Kebijakan Privasi Katerly.
            </p>
          </div>
        </form>

      </section>

      <section className="relative hidden w-1/2 lg:block">
        <img 
          className="h-full w-full object-cover" 
          src="images/Login-bg.webp" 
          alt="Gambar anu" 
        />
      </section>
    </main>
  );
}