import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <nav className='p-4 flex justify-between items-center bg-zinc-800'>
            <a href="/">
                <div className="relative">
                    <img src="/helius-orange.png" width="60" className="transition-transform duration-200 transform hover:scale-100 hover:cursor-pointer" alt="Helius logo" />
                    <img src="/helius-white.png" width="60" className="absolute top-0 left-0 opacity-0 transition-opacity duration-200 transform hover:opacity-100 hover:cursor-pointer" alt="Helius logo" />
                </div>
            </a>

            <WalletMultiButton className='!bg-helius-orange hover:!bg-black transition-all duration-200 !rounded-lg' />
        </nav>
    );
};

export default Navbar;