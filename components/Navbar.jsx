import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className='p-4 flex justify-between items-center bg-zinc-800'>
            <a href="/" className='text-white hover:text-[#eb54bc] transition-all duration-200 flex items-center text-5xl'>
                <img
                    src='/helius.png'
                    alt='logo'
                    width='60'
                />
            </a>
            <div>
                <WalletMultiButton className='!bg-helius-orange hover:!bg-black transition-all duration-200 !rounded-lg' />
            </div>
        </nav>
    );
};

export default Navbar;