const BoilerPlate = () => {
    return (
        <main className="bg-[#161b19] min-h-screen text-white">
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex flex-col text-center items-center border-2 p-10 rounded-lg bg-zinc-800 border-zinc-600">
                    <h1 className="text-4xl italic">
                        your turn to build!
                    </h1>
                    <a href='/' className="rounded-lg mt-8 py-2 w-1/2 bg-helius-orange font-medium transition-all duration-200 border-2 border-transparent hover:border-helius-orange hover:bg-transparent">
                        return home
                    </a>
                </div>
            </div>
        </main>
    )
};

export default BoilerPlate;