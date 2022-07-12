

const About = () => {
    return (
        <div className="bg-[#2a302f] w-full flex flex-col items-center text-center p-4">
            <div>
                <h2 className="text-3xl font-light">
                    The Blockchain Collaborative
                </h2>
                <h3 className="text-xl">
                    at Baylor University
                </h3>
            </div>
            <div className="mt-4">
                <p className="text-lg">
                    We are a student organization at Baylor University, dedicated to advancing and
                    enriching the blockchain community through research, education, and engineering.
                    If you have any questions about this project, please contact <a href='mailto:nathan_galindo1@baylor.edu' target='_blank' rel='noreferrer' className="text-[#eb54bc] hover:text-[#80ebff]">Nathan Galindo</a>.
                </p>
            </div>
        </div>
    );
};

export default About;