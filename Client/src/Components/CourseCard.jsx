import { useNavigate } from "react-router-dom";

function CourseCard({data}){
    const navigate = useNavigate();

    return(
        <div 
            onClick={()=>navigate("/course/description/", {state:{...data}})}
           className="w-[20rem] h-[400px] card-modern cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-modern-md hover:-translate-y-1">
            <div className=" overflow-hidden">
                <img
                    className="h-48 w-full rounded-t-modern group-hover:scale-105 transition-all ease-in-out duration-300"
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                />
                <div className="p-5 space-y-1">
                    <h2 className="text-xl font-bold line-clamp-2" style={{ color: 'var(--color-accent)' }}>
                        {data?.title}
                    </h2>
                    <p className="line-clamp-2" style={{ color: 'var(--color-black)', opacity: 0.8 }}>
                        {data?.description}
                    </p>
                    <p className="font-semibold" style={{ color: 'var(--color-black)' }}>
                        <span className="font-bold" style={{ color: 'var(--color-accent)' }}>Category: </span>
                        {data?.category}
                    </p>
                    {/* <p className=" font-semibold">
                        <span className=" text-yellow-500  font-bold">Total lectures :</span>
                        {data?.numberoflectures}
                    </p> */}
                    <p className="font-semibold" style={{ color: 'var(--color-black)' }}>
                        <span className="font-bold" style={{ color: 'var(--color-accent)' }}>Instructor: </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );

}
export default CourseCard;