import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className='p-4 flex justify-between items-center bg-zinc-800'>
            <div>
                <a href="/" className='text-white hover:text-[#eb54bc] transition-all duration-200 flex items-center text-5xl'>
                    <img
                        src='/official-logo.png'
                        alt='logo'
                        width='80'
                    />
                    <p className='ml-2 italic'>
                        tbc
                    </p>
                </a>
            </div>
            <div>
                <WalletMultiButton className='!bg-[#9e80ff] hover:!bg-[#161b19] transition-all duration-200 !rounded-lg' />
            </div>
        </nav>
    );
};

export default Navbar;