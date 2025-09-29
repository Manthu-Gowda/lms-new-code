import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"

import CourseCard from "../../Components/CourseCard.jsx";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourse } from "../../Redux/Slices/CourseSlice";

function CourseList(){

    const dispatch = useDispatch()
    const {courseData}= useSelector((state)=>state.course);

   async function loadCourses(){
         await dispatch(getAllCourse());
    }
    useEffect(()=>{
        loadCourses();
    },[]);
    return (
        <HomeLayout>
           <div className="min-h-[90vh] pt-12 flex flex-col gap-10 section-modern">
                <h1 className="text-center text-3xl font-semibold" style={{ color: 'var(--color-black)' }}>
                    Explore the course made by 
                    <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
                        Industry experts
                    </span>
                </h1>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 mx-auto gap-8 grid-cols-1 text-center mb-10 container-modern">
                    {courseData?.map((element)=>{
                        return <CourseCard key={element._id} data={element}/>
                    })}
                </div>
             
           </div>

        </HomeLayout>
    )
}
export default CourseList;