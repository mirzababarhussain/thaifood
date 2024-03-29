import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col space-y-4">
                <Link href="/checkout">
                    <button className="flex items-center w-full px-4 py-2 border-2 border-sky-500 bg-white text-sky-500 hover:bg-sky-600 hover:border-sky-600 hover:text-white focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:outline-none py-2 px-6 rounded-full">Pay Now</button>
                </Link>
                <Link href="/menu">
                    <button className="flex items-center w-full px-4 py-2 border-2 border-sky-500 bg-white text-sky-500 hover:bg-sky-600 hover:border-sky-600 hover:text-white focus:text-white focus:bg-sky-600 focus:border-sky-600 focus:outline-none py-2 px-6 rounded-full">Menu</button>
                </Link>
            </div>
            <p className='text-slate-500'><br/><br/>By using Faturah QR you accept our <span className='text-sky-600'>Terms and Conditions</span></p>
            <div className="">
            <p className='text-slate-500 text-lg w-96 text-right'>Powered By</p>
                <p className='text-sky-600 font-bold text-lg w-96 text-right'>FATURAH</p>
            </div>
        </div>
    );
}
