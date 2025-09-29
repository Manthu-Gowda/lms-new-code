function CarouselSlide({image, title, description, slideNumber, totalSlides}) {
    return (
                <div id={`slide${slideNumber}`} className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                        <img src={image} className="w-40 rounded-full border-2" style={{ borderColor: 'var(--color-accent)' }} />
                        <p className="text-xl" style={{ color: 'var(--color-black)', opacity: 0.8 }}>
                            {description}
                        </p>
                        <h3 className="text-2xl font-semibold" style={{ color: 'var(--color-black)' }}>{title}</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 sm:left-5 sm:right-5 right-0 left-0 top-1/2">
                            <a href={`#slide${(slideNumber == 1 ? totalSlides : (slideNumber - 1))}`} className="btn-modern btn-primary w-12 h-12 rounded-full flex items-center justify-center">❮</a> 
                            <a href={`#slide${(slideNumber) % totalSlides + 1}`} className="btn-modern btn-primary w-12 h-12 rounded-full flex items-center justify-center">❯</a>
                        </div>
                    </div>
                    
                </div> 
    );
}

export default CarouselSlide;