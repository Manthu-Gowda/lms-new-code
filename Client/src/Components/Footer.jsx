import {BsFacebook, BsInstagram,BsLinkedin, BsTwitter} from 'react-icons/bs';

function Footer(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return(
        <>
            <footer className='relative left-0 bottom-0 sm:h-[10vh] h-[15vh] py-5 sm:px-20 sm:pb-2 flex flex-col sm:flex-row items-center justify-between' style={{ background: 'var(--color-bg-soft)', color: 'var(--color-black)' }}>
                <section>
                        Copyright {year} | All rights reserved | K Startupp School
                </section>
                <section className='flex items-center justify-center gap-5 text-2xl'>
                    <a className='transition-all ease-in-out duration-300 hover:opacity-80' style={{ color: 'var(--color-accent)' }}>
                        <BsFacebook/>
                    </a>
                    <a className='transition-all ease-in-out duration-300 hover:opacity-80' style={{ color: 'var(--color-accent)' }}>
                        <BsInstagram/>
                    </a>
                    <a className='transition-all ease-in-out duration-300 hover:opacity-80' style={{ color: 'var(--color-accent)' }}>
                        <BsLinkedin/>
                    </a>
                    <a className='transition-all ease-in-out duration-300 hover:opacity-80' style={{ color: 'var(--color-accent)' }}>
                        <BsTwitter/>
                    </a>
                </section>
            </footer>
        </>
    )
}
export default Footer;